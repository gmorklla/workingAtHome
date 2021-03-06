import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
  tap,
  mergeMap
} from 'rxjs/operators';
import { of, iif } from 'rxjs';
import {
  ControlesI,
  EModel,
  OpcionI,
  opcionesDefault
} from 'projects/banorte/src/app/shared/data/data';
import { FormatStylesService } from '../../../../../shared/services/format-styles.service';
import { displayValue } from './../../../../../shared/data/controlesDefault';
import { SnackBarService } from 'projects/banorte/src/app/shared/services/snack-bar.service';
import { OpenDialogService } from 'projects/banorte/src/app/shared/services/open-dialog.service';
import { EventEmitterService } from 'projects/banorte/src/app/shared/services/event-emitter.service';

@Component({
  selector: 'app-general-form',
  templateUrl: './general-form.component.html',
  styleUrls: ['./general-form.component.css']
})
export class GeneralFormComponent implements OnInit, OnChanges {
  generalForm: FormGroup;
  public selectForm: FormGroup;
  public checkboxForm: FormGroup;
  public radioForm: FormGroup;
  linkForm: FormGroup;
  iframeForm: FormGroup;
  inputRangeForm: FormGroup;
  // opciones: FormArray;
  toCompare: string;
  @Input() control: ControlesI;
  public opciones;

  constructor(
    private fb: FormBuilder,
    private formatStyles: FormatStylesService,
    public snack: SnackBarService,
    public openD: OpenDialogService,
    private emitterS: EventEmitterService
  ) {}

  ngOnInit() {
    this.initForm();
    this.listenForm();
    this.setFormValues();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.control) {
      if (this.generalForm) {
        this.setFormValues();
      }
    }
  }

  initForm() {
    const opts = {
      value: ['', Validators.required]
    };
    this.generalForm = this.fb.group(opts);
  }

  listenForm() {
    this.generalForm.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(1000),
        switchMap(val => of(val))
      )
      .subscribe(val => {
        this.emitterS.dispatchAttr(val);
      });
  }

  emitChange(data) {
    this.emitterS.dispatchEvent({
      control: this.control,
      data: data
    });
  }

  setFormValues() {
    if (this.control.type === 'a') {
      this.setLinkForm();
    } else if (this.control.type === 'iframe') {
      this.setIframeForm();
    } else if (this.control.type === 'range') {
      this.setinputRangeForm();
    } else if (this.control.type === 'select') {
      this.setSelectForm();
    } else if (
      this.control.type === 'radio' ||
      this.control.type === 'checkbox'
    ) {
      this.setRadioForm();
    }

    const value = this.control.attributes['value'];
    const valueF = value ? value : displayValue[this.control.type];
    this.generalForm.setValue(
      {
        value: valueF
      },
      { emitEvent: false }
    );
  }

  // general

  getGeneralFormValues(val) {
    const { value } = val;
    const attrs: Array<any> = [{ value: value }];
    return { attrs: attrs };
  }

  // link

  setLinkForm() {
    const opts = {
      link: ['', [Validators.required]]
    };
    this.linkForm = this.fb.group(opts);
    const href = this.control.attributes['href'];
    const hrefF = href ? href : 'http://www.google.com';
    this.linkForm.setValue({
      link: hrefF
    });
    this.linkForm.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(1000),
        switchMap(val => of(val))
      )
      .subscribe(val => {
        const { link } = val;
        this.emitterS.dispatchAttr({ href: link });
      });
  }

  // iframe (video)

  setIframeForm(): void {
    const opts = {
      src: ['', [Validators.required]]
    };
    this.iframeForm = this.fb.group(opts);
    const src = this.control.attributes['src'];
    const srcF = src ? src : 'https://www.youtube.com/watch?v=Yvwi6P1XBHM';
    this.iframeForm.setValue({
      src: srcF
    });
    this.iframeForm.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(1000),
        switchMap(val => of(val))
      )
      .subscribe(val => {
        const { src: source } = val;
        this.emitterS.dispatchAttr({ src: source });
      });
  }

  // range

  public setinputRangeForm(): void {
    const opts = {
      min: ['', [Validators.required]],
      max: ['', [Validators.required]],
      step: ['', [Validators.required]],
      showMinMax: ['', [Validators.required]]
    };
    this.inputRangeForm = this.fb.group(opts);
    const {
      min = 0,
      max = 10,
      step = 0,
      showMinMax = 'true'
    } = this.control.attributes;

    this.inputRangeForm.setValue({
      min: Number(min),
      max: Number(max),
      step: Number(step),
      showMinMax: showMinMax
    });
    this.inputRangeForm.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(1000),
        switchMap(val => of(val)),
        tap(val => {
          const gFValues = Object.assign({}, this.generalForm.value);
          const result = this.getGeneralFormValues(gFValues);
          const {
            min: minR,
            max: maxR,
            step: stepR,
            showMinMax: showMMR
          } = val;
          result.attrs.push(
            { min: minR },
            { max: maxR },
            { step: stepR },
            { showMinMax: showMMR }
          );
          this.emitChange(result);
        })
      )
      .subscribe(_ => {});
  }

  // select

  public setSelectForm(): void {
    const opts = {
      link: ['', [Validators.required]]
    };
    this.selectForm = this.fb.group(opts);
    const src = this.control.attributes['src'];
    const srcF = src ? src : '';
    this.selectForm.setValue({
      link: srcF
    });
    this.selectForm.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(1000),
        switchMap(val => of(val)),
        tap(val => {
          const gFValues = Object.assign({}, this.generalForm.value);
          const generalFormValues = this.getGeneralFormValues(gFValues);
          const { link } = val;

          /*
          generalFormValues contiene tanto los atributos como los estilos.
          La siguiente linea agrega estilos especializados del select a generalFormValues
          También, si quisieramos agregar atributos usaríamos el push a generalFormValues.attrs
          hay varios ejemplos de ello.
          */
          const eModel: EModel = this.selectWithImgInArrow(generalFormValues, {
            src: link
          });
          this.emitChange(eModel);
        })
      )
      .subscribe(_ => {});
  }

  public selectWithImgInArrow(generalFormValues: any, src: any): EModel {
    const eModel: EModel = generalFormValues;
    if (src) {
      eModel.estilos['background-image'] = `url(${src.src})`;
      eModel.estilos['background-position'] = 'right';
      eModel.estilos['background-repeat'] = 'no-repeat';
      eModel.estilos['background-size'] = 'contain';
      eModel.estilos['-webkit-appearance'] = 'none';
    }
    return eModel;
  }

  // radio y checkbox

  public setRadioForm(): void {
    const opts = {
      link: ['', [Validators.required]]
    };
    this.radioForm = this.fb.group(opts);
    const href = this.control.attributes['href'];
    const hrefF = href
      ? href
      : 'http://lnxsapl1d.dev.unix.banorte.com:9080/uf-ui-managment/assets/images/checkboxx.png';
    this.radioForm.setValue({
      link: hrefF
    });
    this.radioForm.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(1000),
        switchMap(val => of(val)),
        tap(val => {
          const gFValues = Object.assign({}, this.generalForm.value);
          const result = this.getGeneralFormValues(gFValues);
          const { link } = val;
          result.attrs.push({ href: link });
          this.emitChange(result);
        })
      )
      .subscribe(_ => {});
  }

  // otros

  colorSelected(e, inputName) {
    let obj;
    switch (inputName) {
      case 'color':
        obj = { color: e };
        break;
      case 'fondo':
        obj = { fondo: e };
        break;
      case 'boderColor':
        obj = {
          border: {
            borderColor: e
          }
        };
        break;
      default:
        break;
    }
    this.generalForm.patchValue(obj);
  }

  getNumValueNoPX(value): number {
    return Number(value.replace('px', ''));
  }

  deleteItem(e) {
    this.emitChange({ delete: this.control });
  }
}
