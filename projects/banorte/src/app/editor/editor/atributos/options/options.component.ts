import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EventEmitterService} from '../../../../shared/services/event-emitter.service';
import {debounceTime, distinctUntilChanged, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {ControlI, opcionesDefault, OpcionI} from '../../../../shared/data/data';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit, OnChanges  {

  selectForm: FormGroup;
  opciones;
  @Input() control;

  constructor(
    private fb: FormBuilder,
    private emitterS: EventEmitterService
  ) { }

  ngOnInit() {
    this.initForm();
    this.setFormValues();
    this.listenForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.control) {
      if (this.selectForm) {
        console.log('Que onda aquí');
        console.log(this.selectForm);
        // this.setFormValues();
      }
    }
  }

  initForm(): any {

    this.selectForm = this.fb.group({
      opciones: this.fb.array([], Validators.required)
    });

  }

  setFormValues(): any {

    const opcionesArray: any[] = this.convertObjToArr(this.control.options);
    const opciones = opcionesArray ? opcionesArray : opcionesDefault;


    opciones.forEach(op => this.agregaOpcion(op));
    this.selectForm.setValue({
      opciones: opciones
    });

    console.log('De que se compone form, estoy buscando los options.');
    console.log(this.selectForm.get('opciones'));

  }

  listenForm(): any {
    this.selectForm.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(1000),
        switchMap(val => of(val))
      )
      .subscribe(val => {
        console.log('Estatus de la form: this.selectForm.value ');
        console.log(this.selectForm);

        if (this.selectForm.status === 'VALID') {

          // recuperamos los valores de la forma, pero en este caso sólo los de estilo
          const { opciones } = val;

          // Emitimos el control con los options actualizado
          const control: ControlI = this.generarControlFinal(this.control, opciones);

          this.emitterS.dispatchOptions(control);
        }

      });
  }

  generarControlFinal(controlSeleccionado: ControlI, opciones: any[]): ControlI {

    const resultado: ControlI = {
      id: controlSeleccionado.id,
      name: controlSeleccionado.name,
      type: controlSeleccionado.type,
      attributes: controlSeleccionado.attributes,
      options: this.convertArrToObj(opciones),
      tag: controlSeleccionado.tag,
    };

    return resultado;
  }

  convertObjToArr(options: any): any[] {
    if (options) {

      const resultado: any[] = Object
        .keys(options)
        .map(key => {

          const objF: any = {};

          objF.viewValue = key;

          objF.value = options[key];

          return objF;

        });

      return resultado;
    } else {

      return undefined;
    }

    // Esta función convierte los 'options' que llegan en forma de objeto en un array de objetos
    // y cada objeto consta de propiedad y valor, viewValue y value respectivamente.

  }

  convertArrToObj(options: any[]): any {

    const objeto = options.map(item => ({
        [item.viewValue]: item.value
      })
    );

    const resultado: any = Object.assign({}, ...objeto );

    return resultado;
  }

  agregaOpcion(option: OpcionI = null): void {
    this.opciones = this.selectForm.get('opciones') as FormArray;
    this.opciones.push(this.creaOpcion(option));
  }

  creaOpcion(option: OpcionI = null): FormGroup {
    return option
      ? this.fb.group({
        value: [option.value, [Validators.required]],
        viewValue: [option.viewValue, [Validators.required]]
      })
      : this.fb.group({
        value: ['', [Validators.required]],
        viewValue: ['', [Validators.required]]
      });
  }

  deleteInvoiceParticulars(idx: number) {

    this.invoiceparticularsArray.removeAt(idx);

  }

  get invoiceparticularsArray(): FormArray{
    return this.selectForm.get('opciones') as FormArray;
  }

}
