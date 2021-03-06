import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  distinctUntilChanged,
  tap,
  switchMap,
  debounceTime,
  filter,
  skip,
  mergeMap
} from 'rxjs/operators';
import { of, iif } from 'rxjs';
import { InputButtonService } from '../input-button.service';

export interface ControlesI {
  id: number;
  type: string;
  description: string;
  image: string;
  tag: string;
  attributes: {};
}

@Component({
  selector: 'lib-form-input-button',
  templateUrl: './form-input-button.component.html',
  styleUrls: ['./form-input-button.component.css']
})
export class FormInputButtonComponent implements OnInit {
  stylesContainerForm: FormGroup;
  @Output() propChange = new EventEmitter();
  @Input() control: ControlesI;
  toCompare: string;
  color;

  constructor(private fb: FormBuilder, private service: InputButtonService) {
    const attrOpts = {
      width: ['', [Validators.required]],
      height: ['', [Validators.required]],
      x: ['', [Validators.required]],
      y: ['', [Validators.required]],
      background: ['', [Validators.required]],
      value: ['', Validators.required]
    };
    this.stylesContainerForm = this.fb.group(attrOpts);
    this.stylesContainerForm.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(1000),
        switchMap(val => of(val)),
        filter(val => JSON.stringify(val) !== this.toCompare),
        tap(val => {
          this.toCompare = JSON.stringify(val);
          const { width, height, x, y, background, value } = val;
          const style = {
            width: width,
            height: height,
            x: x,
            y: y,
            background: background
          };
          const attrs = [{ value: value }];
          this.propChange.emit({ estilos: val, attrs: attrs });
        })
      )
      .subscribe(_ => {});
  }

  ngOnInit() {
    this.setFormValues();
  }

  setFormValues() {
    const value = this.control.attributes['value'];
    const valueF = value ? value : 'Mensaje';
    const styleObj = this.control.attributes['style']
      ? this.service.stringToObj(this.control.attributes['style'])
      : {};
    let {
      width = '100px',
      height = '100px',
      transform = 'translate3d(0,0,0)',
      background = ''
    } = styleObj;
    const coords = transform
      .slice(transform.indexOf('(') + 1, transform.indexOf(')'))
      .split(',');
    const x = this.getNumValueNoPX(coords[0]);
    const y = this.getNumValueNoPX(coords[1]);
    width = this.getNumValueNoPX(width);
    height = this.getNumValueNoPX(height);
    this.stylesContainerForm.setValue(
      {
        width: width,
        height: height,
        x: x,
        y: y,
        background: background,
        value: valueF
      },
      { emitEvent: false }
    );
  }

  colorSelected(e) {
    this.stylesContainerForm.patchValue({
      background: e
    });
  }

  getNumValueNoPX(value): number {
    return Number(value.replace('px', ''));
  }

  deleteItem(e) {
    const confirmP = confirm('¿Quieres borrar este ' + this.control.type + '?');
    const delete$ = of(true).pipe(
      tap(val => this.propChange.emit({ delete: this.control }))
    );
    const x$ = of('X');
    of(confirmP)
      .pipe(mergeMap(val => iif(() => val, delete$, x$)))
      .subscribe(_ => {});
  }
}
