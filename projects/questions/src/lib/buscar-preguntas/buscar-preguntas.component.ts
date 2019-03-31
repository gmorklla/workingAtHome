import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, switchMap, tap} from 'rxjs/operators';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ControlHTML} from '../models/controlHTML.model';
import {Pregunta} from '../models/preguntas.model';
import {Answer} from '../models/answers.model';
import {Codes} from '../models/code.model';
import {ChildWindow} from '../models/child-window.model';
import {Relacion} from '../models/relacion.pregunta.model';
import {PreguntasService} from '../services/preguntas.service';
import {AlertasService} from '../services/alertas.service';
import {WindowService} from '../services/window.service';
import {GetIconsService} from '../services/get-font-awesome/get-icons.service';
import {NewChildWindowModel} from "../models/new.child-window.model";


@Component({
  selector: 'iib-buscar-preguntas',
  templateUrl: './buscar-preguntas.component.html',
  providers: [GetIconsService]
})
export class BuscarPreguntasComponent implements OnInit {

  @Input() public controlHTML: ControlHTML;
  @Input() public pregunta: Pregunta;
  @Input() public windowId: string;

  @Output() public regresarPregunta = new EventEmitter();

  public buscarPreguntasForm: FormGroup;
  public preguntaForm: FormGroup;
  public orderForm: FormGroup;
  public items: FormArray;

  public preguntaNueva: Pregunta;
  public answers: Answer[] = [];
  public answersPregunta: Answer[] = [];
  public answer: Answer;
  public relacion: Relacion;

  public bandera: Boolean = false;
  public nombre: string;
  public model: any;
  public searching = false;
  public searchFailed = false;
  public tipoPregunta: number;
  public closeResult: string;
  public tipoPreguntaAux: number;

  constructor(private getIcons: GetIconsService,
              private preguntasService: PreguntasService,
              private formBuilder: FormBuilder,
              private modalService: NgbModal,
              private alertasService: AlertasService,
              private windowService: WindowService
  ) {
    this.buscarPreguntasForm = null;
    this.answersPregunta = [];
    this.pregunta = null;
  }

  ngOnInit() {

    this.orderForm = this.formBuilder.group({
      'items': this.formBuilder.array([this.createItem()])
    });

    this.answer = {
      id: 0,
      description: '',
      code: ''
    };
    this.crearPreguntaForm();
    this.inicializarPregunta();

    this.tipoPreguntaAux = 1;
    if (this.controlHTML.question) {
      this.nombre = this.controlHTML.question.description;
    }
    this.getTipoPregunta();

    this.relacion = {
      'idQuestion': 0,
      'idControl': 0
    };
  }

  createItem(): FormGroup {
    return this.formBuilder.group({
      type: '',
      description: ''
    });
  }

  addItem(): void {
    this.items = this.preguntaForm.get('answers') as FormArray;
    this.items.push(this.createItem());
  }

  crearPreguntaForm() {
    this.buscarPreguntasForm = this.formBuilder.group({
      'pregunta': new FormControl(this.controlHTML.question === null ? null : this.controlHTML.question),
    });
  }

  inicializarPregunta() {
    this.preguntaForm = this.formBuilder.group({
      'description': new FormControl('', Validators.required),
      'type': new FormControl('', Validators.required),
      'answers': this.formBuilder.array([this.createItem()], Validators.required)
    });

  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term =>
        this.preguntasService.buscarPreguntas(term, this.tipoPregunta).pipe(
          tap(() => this.searchFailed = false),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          }))
      ),
      tap(() => this.searching = false)
    );

  inFormatter = (result: Pregunta) => result.description;

  searchCodigo = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term =>
        this.preguntasService.buscarCodigoRespuesta(term).pipe(
          tap(() => this.searchFailed = false),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          }))
      ),
      tap(() => this.searching = false)
    );

  inFormatterCodes = (result: Codes) => result.description;

  codigoSeleccionado(code: Codes) {
    if (code) {
      this.answer.code = code.type;
    }
  }

  preguntaSeleccionada(pregunta: Pregunta) {
    this.pregunta = pregunta;
    this.answersPregunta = [];
    this.getTipoPregunta();
    if (this.buscarPreguntasForm.value.pregunta) {
      this.tipoPreguntaAux = pregunta.type;
      this.answersPregunta = this.buscarPreguntasForm.value.pregunta.answers;
    }
  }

  vincular() {
    if (this.pregunta) {
      this.controlHTML.question = this.pregunta;
      this.relacion.idQuestion = this.pregunta.id;
      this.relacion.idControl = this.controlHTML.id;
      this.insertarRelacionPregunta(this.relacion);
    }
  }

  getTipoPregunta() {
    if (this.controlHTML.type === 'text') {
      this.tipoPregunta = 1;
    } else if (this.controlHTML.type === 'checkbox' || this.controlHTML.type === 'radio' || this.controlHTML.type === 'select') {
      this.tipoPregunta = 2;
    } else {
      this.tipoPregunta = 0;
    }
  }

  open(content) {
    this.getTipoPregunta();
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.inicializarPregunta();
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  setTipoPregunta(value: number) {
    this.tipoPregunta = value;
    this.preguntaForm.controls['answers'].reset();
  }

  insertarPregunta(pregunta: Pregunta) {
    this.preguntasService.insertarPregunta(pregunta).subscribe({
      next: (result: Pregunta) => {
        console.log('[RESPONSE] ', result);
        this.alertasService.seCreoConExito();
        if (result.id) {
          this.answersPregunta = this.preguntaForm.value.answers;
          this.pregunta = result;
          this.nombre = result.description;
        }
      },
      error: (error: any) => {
        this.alertasService.noSePudoActualizar();
      },
      complete: () => {
        this.modalService.dismissAll();
        this.preguntaForm.value.answers = null;
        this.inicializarPregunta();
      }
    });
  }

  insertarRelacionPregunta(relacion: Relacion) {
    let childrenWindows = '';
    const windowSent: ChildWindow = {
      id: 0,
      height: 0,
      width: 0,
      name: 'window',
      flowId: 'f0',
      controls: null,
      responseCode: ''
    };
    this.preguntasService.insertarRelacionPregunta(relacion).subscribe({
      next: (result: Relacion) => {
        console.log('[RESPONSE] ', result);
        this.alertasService.seCreoConExito();
        if (result.idControl) {
        }
      },
      error: (error: any) => {
        this.alertasService.noSePudoActualizar();
      },
      complete: () => {
        this.modalService.dismissAll();
      }
    });

    const splitted = window.location.pathname.split('/', 6);
    windowSent.flowId = splitted[3];
    windowSent.width = 800;
    windowSent.height = 600;
    (this.pregunta.answers as any).forEach((answer) => {
      const childWindowModel: NewChildWindowModel = {
        flowId: splitted[3],
        width: 500,
        height: 500,
        name: 'name',
        responseCode: answer.code,
        attributes: {
          style: 'background:#ffffff'
        }
      };
      childrenWindows += this.windowService.createChildrenWindow(childWindowModel, this.windowId).subscribe(
        {
          next: (result) => {
            console.log('[RESPONSE] ', result);
            this.alertasService.operacionExitosa('' + result.id);
            this.regresarPregunta.emit();
          }
        }
      );
    });
  }

  crear(obj: any) {
    this.answers = [];
    this.bandera = false;
    if (this.tipoPregunta === 2) {
      this.tipoPreguntaAux = 2;
      this.preguntaForm.value.answers.forEach(element => {
        this.answer = {
          id: 0,
          description: '',
          code: ''
        };

        element.description == null || element.description === '' ? this.bandera = true : this.answer.description = element.description;
        element.type == null || element.type.type == null ? this.bandera = true : this.answer.code = element.type.type;
        this.answers.push(this.answer);
      });
      this.preguntaForm.value.answers = this.answers;
    } else {
      this.tipoPreguntaAux = 1;
      this.preguntaForm.value.answers = null;
    }
    this.preguntaForm.value.type = this.tipoPregunta;
    // tslint:disable-next-line:max-line-length
    this.preguntaForm.value.description == null || this.preguntaForm.value.description === '' ? this.bandera = true : this.preguntaNueva = this.preguntaForm.value;

    if (!this.bandera) {
      this.insertarPregunta(this.preguntaNueva);
    }
  }

  remove(index: number) {
    if ((<FormArray>this.preguntaForm.controls['answers']).length > 1) {
      (<FormArray>this.preguntaForm.controls['answers']).removeAt(index);
    }
  }

  getIcon(i) {
    return this.getIcons.getIcon(i);
  }

}
