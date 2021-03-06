import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import {
  ControlesI,
  ControlI,
  WindowI,
  commands,
  WidgetI
} from '../../shared/data/data';
import { FormatStylesService } from '../../shared/services/format-styles.service';
import { GetIconsService } from '../../shared/services/get-icons.service';
import { UpdateStylesService } from '../../shared/services/update-styles.service';
import {
  tap,
  switchMap,
  withLatestFrom,
  filter,
  mergeMap,
  concatMap,
  takeUntil,
  debounceTime
} from 'rxjs/operators';
import { HttpCallService } from 'projects/http-call/src/public_api';
import {
  ActivatedRoute,
  Router,
  NavigationEnd,
  NavigationStart
} from '@angular/router';
import { EventEmitterService } from '../../shared/services/event-emitter.service';
import { CleanTransformService } from '../../shared/services/clean-transform.service';
import { MatSnackBar } from '@angular/material';
import { target } from '../../shared/data/port';
import { WindowModel } from '../../models/window/window.model';
import { Subject, of, iif, Observable, interval, timer } from 'rxjs';
import { ShortcutsService } from '../../shared/services/shortcuts.service';
import { EditorRelatedService } from '../../shared/services/editor-related.service';
import { InputRangeService } from 'projects/input-range/src/public_api';
import {
  ctrlStyleMap,
  displayValue
} from 'projects/banorte/src/app/shared/data/controlesDefault';
import { OpenDialogService } from 'projects/banorte/src/app/shared/services/open-dialog.service';
import {
  controles as sControles,
  window as sWindow
} from 'projects/banorte/src/app/shared/data/staticData';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
  providers: [
    FormatStylesService,
    GetIconsService,
    UpdateStylesService,
    CleanTransformService,
    ShortcutsService
  ]
})
export class EditorComponent implements OnInit, OnDestroy {
  public designId: string;
  public window: WindowI;
  public windowId: string;
  public controlesHTML;
  public widgets;
  public ctrlIdxSelected: number;
  public ctrlSelected: ControlI;
  public windowSelected: WindowI;
  public width: number;
  public height: number;
  public destroy$ = new Subject();
  public update$ = new Subject();
  public lastChange: string;
  public copyCmd: string;
  public showShortcutsMenu = false;
  public lockAxis: string;
  public windowStyles;

  constructor(
    private formatStyles: FormatStylesService,
    private getIcons: GetIconsService,
    private updateStylesServ: UpdateStylesService,
    private http: HttpCallService,
    private route: ActivatedRoute,
    private router: Router,
    public emitterS: EventEmitterService,
    private cleanTransform: CleanTransformService,
    private shortcuts: ShortcutsService,
    private editorRS: EditorRelatedService,
    private rangeS: InputRangeService,
    public openD: OpenDialogService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.setWindow();
    this.getControles();
    this.getWidgets();
    this.update$
      .pipe(
        takeUntil(this.destroy$),
        switchMap(val => timer(10000)),
        tap(val => this.emitterS.control$.next(true))
      )
      .subscribe(_ => console.log('timer'));
    this.emitterS.control$
      .pipe(
        takeUntil(this.destroy$),
        withLatestFrom(this.update$),
        filter(val => JSON.stringify(val[1]) !== this.lastChange),
        switchMap(val => {
          this.lastChange = JSON.stringify(val[1]);
          const url = `${target}control`;
          return this.http.putRequest(url, val[1], {});
        })
      )
      .subscribe(
        val => console.log('saveCtrl$ request //////////// ', val),
        error => {
          this.open('Error intentando salvar', 'Ok', 5000);
          console.log('Error intentando salvar: ', error);
        }
      );
    this.emitterS.events
      .pipe(
        takeUntil(this.destroy$),
        tap(val => {
          if (val['window']) {
            this.updateWindowProperties(val['data']);
          } else if (val['data'].delete) {
            this.deleteCtrl(val['control'].id);
          } else {
            console.log(
              'updateStyles from emitterS.events',
              val['data'].estilos,
              val['data'].attrs
            );
            this.updateStyles(val['data'].estilos, val['data'].attrs);
          }
        })
      )
      .subscribe(_ => {});
    // -------------------- Inserta control
    this.listenToInsertCtrls();
    // Inserta widget con shortcuts
    this.emitterS.shortcuts
      .pipe(takeUntil(this.destroy$))
      .subscribe(shortcut => {
        this.insertaWidget(
          this.widgets.filter(wid => wid.id === shortcut['id'])[0]
        );
      });
    // Ejecuta comando (copiar/pegar/borrar) con shortcuts
    this.emitterS.command$
      .pipe(takeUntil(this.destroy$))
      .subscribe(shortcut =>
        this.execCommand(commands.filter(cmd => cmd.id === shortcut['id'])[0])
      );
    // Styles
    this.emitterS.styles
      .pipe(takeUntil(this.destroy$))
      .subscribe(style => this.newUpdateStyles(style));
    // Attrs
    this.emitterS.attrs
      .pipe(takeUntil(this.destroy$))
      .subscribe(attrs => this.newUpdateStyles({}, attrs));
    // Window styles
    this.emitterS.windowStyles$
      .pipe(takeUntil(this.destroy$))
      .subscribe(style => this.newUpdateWindow(style));
    // rzStartE
    this.emitterS.rzStartE
      .pipe(takeUntil(this.destroy$))
      .subscribe((ctrl: ControlesI) => this.clickEmitted(ctrl));
    // Al terminar la navegacion, carga window
    this.router.events.pipe(takeUntil(this.destroy$)).subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.setWindow();
      }
    });

    this.rangeS.emitChange
      .pipe(takeUntil(this.destroy$))
      .subscribe(change => this.newUpdateStyles({}, change));

    // Opciones para los select
    /*
    this.emitterS.options.subscribe(options => this.updateOptionsSelect(options));
    */

    this.emitterS.options
      .pipe(takeUntil(this.destroy$))
      .subscribe(options => this.updateOptionsSelect(options));
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  listenToInsertCtrls() {
    const emit$ = this.emitterS.createControl$;
    const insertCtrl$ = emit$.pipe(
      debounceTime(100),
      tap(val => this.emitterS.control$.next(true)),
      switchMap(shortcut => {
        const control = this.controlesHTML.filter(
          ctrl => ctrl.id === shortcut['id']
        )[0];
        return this.insertaControl$(control);
      })
    );
    insertCtrl$.pipe(takeUntil(this.destroy$)).subscribe(
      ctrl => {
        this.ctrlSelected = ctrl;
        this.window.controls
          ? this.window.controls.push(ctrl)
          : (this.window['controls'] = [ctrl]);
      },
      error => {
        this.open('Error al intentar insertar control', 'Ok', 5000);
        console.log('Error intentando insertar control: ', error);
      }
    );
  }

  setWindow() {
    this.designId = this.route.snapshot.paramMap.get('designId');
    this.windowId = this.route.snapshot.paramMap.get('windowId');
    this.getWindow();
    this.ctrlSelected = null;
    this.ctrlIdxSelected = null;
  }

  insertaControl$(e: ControlesI): Observable<any> {
    return this.editorRS.insertaControl(e, this.windowId);
  }

  insertaWidget(e: WidgetI) {
    this.editorRS
      .insertaWidget(e, this.windowId)
      .subscribe(_ => this.getWindow());
  }

  execCommand(e) {
    const result = this.editorRS.execCommand(
      e.cmd,
      this.ctrlSelected,
      this.copyCmd
    );
    if (result) {
      this[result.code](); // Copiar/Pegar/Borrar ctrl
    }
  }

  copiarCtrl() {
    this.copyCmd = this.ctrlSelected.attributes['style'];
    this.open('Copiado', 'Ok', 5000);
  }

  pegarCtrl() {
    this.ctrlSelected.attributes['style'] = this.copyCmd;
    this.makeUpdateRequest();
  }

  borrarCtrl() {
    this.deleteCtrl(this.ctrlSelected.id);
  }

  getControlString(control) {
    return JSON.stringify(control);
  }

  getWindow() {
    this.editorRS.getWindow(this.windowId).subscribe(
      (window: WindowI) => {
        this.window = window;
        this.setStylesOfWindow();
      },
      error => {
        this.open('Error al intentar obtener window', 'Ok', 5000);
        console.log('Error intentando obtener window: ', error);
      }
    );
  }

  getControles() {
    this.editorRS.getControles().subscribe(
      controles => {
        this.controlesHTML = controles;
      },
      error => {
        this.open(
          'Error al intentar obtener lista de controles, se usará default',
          'Ok',
          5000
        );
        console.log('Error intentando obtener lista de controles: ', error);
        this.controlesHTML = sControles;
      }
    );
  }

  getWidgets() {
    this.editorRS
      .getWidgets()
      .pipe(tap(val => (this.widgets = val)))
      .subscribe(
        widget$ => {},
        error => {
          this.open('Error al intentar obtener lista de widgets', 'Ok', 5000);
          console.log('Error intentando obtener widgets: ', error);
        }
      );
  }

  // Obtiene estilos que deben aplicarse a cada window
  public setStylesOfWindow() {
    const styleObj =
      this.window.attributes && this.window.attributes['style']
        ? this.formatStyles.stringToObj(this.window.attributes['style'])
        : {};
    console.log('styleObj window', styleObj);
    this.windowStyles = { ...styleObj };
  }

  // Obtiene estilos que deben aplicarse al contenedor
  setStylesOfContainer(control: ControlesI) {
    const styleObj =
      control.attributes && control.attributes['style']
        ? this.formatStyles.stringToObj(control.attributes['style'])
        : {};
    const { width, height, transform = 'translate3d(0,0,0)' } = styleObj;
    delete styleObj.top;
    delete styleObj.left;
    this.width = Number(width) + 1;
    this.height = Number(height) + 1;
    const fObj = {
      transform: transform,
      position: 'absolute',
      'z-index': 0
    };
    return { ...fObj };
  }

  clickEmitted(control: ControlesI) {
    if (this.ctrlSelected && this.ctrlSelected.id !== control.id) {
      this.emitterS.control$.next(true);
    }
    const idx = this.window.controls.findIndex(ctrl => ctrl.id === control.id);
    this.ctrlIdxSelected = idx;
    this.ctrlSelected = this.window.controls[idx];
  }

  clickOnCtrl(e, idx: number, control: ControlesI, windowId: string) {
    if (this.ctrlSelected && this.ctrlSelected.id !== control.id) {
      this.emitterS.control$.next(true);
    }
    this.ctrlIdxSelected = idx;
    this.ctrlSelected = control;
  }

  getIcon(i) {
    return this.getIcons.getIcon(i);
  }

  updateStyles(estilos: { [key: string]: any }, atributos = null) {
    const ctrlClone: ControlI = { ...this.ctrlSelected };
    const { transform } = estilos;
    if (transform) {
      estilos.transform =
        'translate3d(' + this.cleanTransform.cleanTransform(transform) + ')';
    }
    const newStylesObj = this.updateStylesServ.update(estilos, ctrlClone);
    ctrlClone.attributes['style'] = newStylesObj;
    if (atributos) {
      atributos.forEach(attr => {
        const key = Object.keys(attr)[0];
        ctrlClone.attributes[key] = attr[key];
      });
    }
    this.ctrlSelected = Object.assign({}, ctrlClone);
    this.makeUpdateRequest();
  }

  newUpdateStyles(estilos: { [key: string]: any }, atributos = null) {
    const clone = this.editorRS.getCloneUpdated(
      { ...this.ctrlSelected },
      estilos,
      atributos
    );
    this.ctrlSelected = Object.assign({}, clone);
    this.makeUpdateRequest();
  }

  makeUpdateRequest() {
    this.provocaOnChange();
    this.update$.next(this.ctrlSelected);
  }

  provocaOnChange() {
    const ctrlIdx = this.window.controls.findIndex(
      ctrl => ctrl.id === this.ctrlSelected.id
    );
    this.window.controls[ctrlIdx] = this.ctrlSelected;
    const cloneW = JSON.parse(JSON.stringify(this.window));
    this.window = cloneW;
  }

  deleteCtrl(id) {
    const url = `${target}control/${id}`;
    const delete$ = this.http.deleteRequest(url, {}).pipe(
      tap(val => {
        this.getWindow();
        this.ctrlSelected = null;
        this.ctrlIdxSelected = null;
      })
    );
    const x$ = of('X');
    this.openD
      .openDialog(
        `¿Quieres borrar este control: ${displayValue[this.ctrlSelected.type]}?`
      )
      .pipe(mergeMap(val => iif(() => val, delete$, x$)))
      .subscribe(
        next => {},
        error => {
          this.open(
            `Error al intentar borrar control con id ${id}`,
            'Ok',
            5000
          );
          console.log(`Error al intentar borrar control con id ${id}`, error);
        }
      );
  }

  clickOnWindow(window: WindowI): void {
    this.windowSelected = window; // TODO: A este wiwndow creo que deberíamos quitarle los controles para aligerar el binding.
    this.ctrlSelected = null;
    this.ctrlIdxSelected = null;
    this.emitterS.control$.next(true);
  }

  otherClick() {
    this.emitterS.control$.next(true);
  }

  public newUpdateWindow(style: string) {
    this.windowStyles = this.formatStyles.stringToObj(style);
    this.window.attributes.style = style;
    this.updateWindowPutRequest();
  }

  public updateWindowProperties(data: any): void {
    if (data.estilos) {
      const styleString = this.formatStyles.objToString(data.estilos);
      this.window.attributes
        ? (this.window.attributes.style = styleString)
        : (this.window.attributes = { style: styleString });
    } else {
      Object.entries(data).forEach(entry => {
        const key = entry[0];
        const value = entry[1];
        this.window[key] = value;
      });
    }
    this.updateWindowPutRequest();
  }

  public updateWindowPutRequest(): void {
    console.log('window to save', this.window);
    const url = `${target}window`;
    this.http
      .putRequest(url, this.window, {})
      .subscribe(result => this.getWindow());
  }

  // [ini] Sección de opciones para los select
  updateOptionsSelect(val: any): void {
    const url = `${target}control/options`;

    console.log('Se envian las opciones del select al back: ');
    console.log(val);

    this.http.putRequest(url, val, {}).subscribe(
      (control: ControlI) => {
        this.getWindow();
      },
      err => {
        this.open(`Error al actualizar opciones de select`, 'Ok', 5000);
        console.log(`Error al actualizar opciones de select`);
      }
    );
  }
  // Para prevenir que cierren la ventana con un mensaje
  doBeforeUnload() {
    return true;
  }
  // Muestra mensaje
  open(message: string, action: string, duration: number = 10000) {
    this.snackBar.open(message, action, {
      duration: duration
    });
  }
}
