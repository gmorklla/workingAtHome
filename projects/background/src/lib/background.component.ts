import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { distinctUntilChanged, debounceTime, tap } from 'rxjs/operators';
import { BackgroundService, BackgroundFormI } from './background.service';

@Component({
  selector: 'lib-background',
  templateUrl: 'background.component.html',
  styleUrls: ['background.component.css']
})
export class BackgroundComponent implements OnInit {
  @Input() control;
  @Output() cssEmitter = new EventEmitter();
  public backForm: FormGroup;
  public color1;
  public color2;
  public style;

  constructor(private fb: FormBuilder, private service: BackgroundService) {}

  ngOnInit() {
    const estilos = this.service.stringToObj(this.control.attributes.style);
    const group = {
      color1: ['rgba(255,255,255,1)'],
      color2: ['rgba(255,255,255,1)'],
      gradient: [false],
      linearRadial: [{ value: 'linear', disabled: true }],
      image: [{ value: 'assets/pattern.png', disabled: true }],
      useImg: [false],
      repeat: [{ value: false, disabled: true }],
      x: [{ value: true, disabled: true }],
      y: [{ value: true, disabled: true }]
    };
    this.backForm = this.fb.group(group);
    this.setForm(estilos);
    this.backForm.get('useImg').valueChanges.subscribe(val => {
      if (val) {
        this.backForm.get('image').enable();
        this.backForm.get('repeat').enable();
        this.backForm.patchValue({ gradient: false });
      } else {
        this.backForm.get('image').disable();
        this.backForm.get('repeat').disable();
      }
    });
    this.backForm.get('gradient').valueChanges.subscribe(val => {
      if (val) {
        this.backForm.get('linearRadial').enable();
        this.backForm.patchValue({ useImg: false });
      } else {
        this.backForm.get('linearRadial').disable();
      }
    });
    this.backForm.get('repeat').valueChanges.subscribe(val => {
      if (val) {
        this.backForm.get('x').enable();
        this.backForm.get('y').enable();
      } else {
        this.backForm.get('x').disable();
        this.backForm.get('y').disable();
      }
    });
    this.backForm.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(1000),
        tap((val: BackgroundFormI) => {
          this.style = this.service.formatCssForm(val);
          this.cssEmitter.emit(this.style);
        })
      )
      .subscribe(_ => {});
  }

  setForm(estilos) {
    const valueToCheck = estilos.background || estilos['background-color'];
    const linear = valueToCheck.includes('linear');
    const radial = valueToCheck.includes('radial');
    const gradient = linear || radial ? true : false;
    const linearRadial = linear ? 'linear' : 'radial';
    const reg = /(rgb|rgba)\(\d{1,3},\d{1,3},\d{1,3}(?:,.{1,3})?\)/g;
    const values = valueToCheck.match(reg);
    const color1 = values[0];
    const color2 = gradient ? values[1] : 'rgba(255,255,255,1)';
    const useImg = valueToCheck.includes('url');
    const regUrl = /(url)\(.+\)/g;
    const image = useImg
      ? valueToCheck.match(/(?:url)\((.+)\)/)[1].slice(1, -1)
      : '';
    const repeat = valueToCheck.includes(' repeat ');
    const repeatX = valueToCheck.includes('repeat-x');
    const repeatY = valueToCheck.includes('repeat-y');

    this.backForm.setValue(
      {
        color1: color1,
        color2: color2,
        gradient: gradient,
        linearRadial: linearRadial,
        image: image,
        useImg: useImg,
        repeat: repeat,
        x: repeatX,
        y: repeatY
      },
      { emitEvent: false }
    );
    this.disableEnable();
  }

  disableEnable() {
    this.backForm.get('gradient').value
      ? this.backForm.get('linearRadial').enable()
      : this.backForm.get('linearRadial').disable();
    if (this.backForm.get('useImg').value) {
      this.backForm.get('image').enable();
      this.backForm.get('repeat').enable();
    } else {
      this.backForm.get('image').disable();
      this.backForm.get('repeat').disable();
    }
    if (
      this.backForm.get('repeat').disabled ||
      !this.backForm.get('repeat').value
    ) {
      this.backForm.get('x').disable();
      this.backForm.get('y').disable();
    } else {
      this.backForm.get('x').enable();
      this.backForm.get('y').enable();
    }
  }

  colorSelected(e, inputName) {
    inputName === 'color1'
      ? this.backForm.patchValue({ color1: e })
      : this.backForm.patchValue({ color2: e });
  }
}
