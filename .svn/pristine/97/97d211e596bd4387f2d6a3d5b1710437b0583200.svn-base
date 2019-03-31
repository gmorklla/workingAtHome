import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
  tap
} from 'rxjs/operators';
import { of } from 'rxjs';

export interface WindowI {
  id: number;
  height: number;
  width: number;
  name: string;
  controls: any;
  designId: number;
  type: string;
  attributes?: { [key: string]: any };
}

@Component({
  selector: 'lib-form-window-edit',
  templateUrl: './form-window-edit.component.html',
  styleUrls: ['./form-window-edit.component.css']
})
export class FormWindowEditComponent implements OnInit, OnChanges {
  stylesContainerForm: FormGroup;
  @Output() propChange = new EventEmitter();
  @Input() window: WindowI;

  toCompare: string;

  constructor(private fb: FormBuilder) {
    const attrOpts = {
      width: ['', [Validators.required]],
      height: ['', [Validators.required]]
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
          const { width, height } = val;
          this.propChange.emit({ windowValue: val });
        })
      )
      .subscribe(_ => {});
  }

  ngOnInit() {
    this.setFormValues();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('changes: changes.window', changes);
  }

  setFormValues() {
    this.stylesContainerForm.setValue(
      {
        width: this.window['width'],
        height: this.window['height']
      },
      { emitEvent: false }
    );
  }
}
