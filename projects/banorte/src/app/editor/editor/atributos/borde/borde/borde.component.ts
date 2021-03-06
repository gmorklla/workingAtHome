import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import {
  distinctUntilChanged,
  debounceTime,
  switchMap,
  filter,
  tap
} from 'rxjs/operators';
import { of } from 'rxjs';
import { EventEmitterService } from 'projects/banorte/src/app/shared/services/event-emitter.service';
import { FormatStylesService } from 'projects/banorte/src/app/shared/services/format-styles.service';

@Component({
  selector: 'app-borde',
  templateUrl: './borde.component.html',
  styleUrls: ['./borde.component.css']
})
export class BordeComponent implements OnInit, OnChanges {
  formGroup: FormGroup;
  @Input() ctrlSelected;
  toCompare: string;
  styleObj: any;
  boderColor;

  constructor(
    private fb: FormBuilder,
    private emitterS: EventEmitterService,
    private formatStyles: FormatStylesService
  ) {}

  ngOnInit() {
    this.initForm();
    this.listenForm();
    this.setFormValues();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.ctrlSelected) {
      if (this.formGroup) {
        this.setFormValues();
      }
    }
  }

  initForm(): any {
    this.formGroup = this.fb.group({
      borderWidth: ['', [Validators.required]],
      borderStyle: ['', [Validators.required]],
      borderColor: ['', [Validators.required]],
      borderRadius: ['', [Validators.required]]
    });
  }

  listenForm(): any {
    this.formGroup.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(1000),
        switchMap(val => of(val))
      )
      .subscribe(val => {
        const objToEmit = this.getGeneralFormValues(val);
        this.emitterS.dispatchStyle(objToEmit);
      });
  }

  getGeneralFormValues(val: any): any {
    const {
      borderWidth = null,
      borderStyle = null,
      borderColor = null,
      borderRadius = null
    } = val;
    const style = {
      'border-width': borderWidth ? borderWidth + 'px' : null,
      'border-style': borderStyle,
      'border-color': borderColor,
      'border-radius': borderRadius ? borderRadius + 'px' : null
    };
    return style;
  }

  setFormValues(): any {
    this.styleObj = this.ctrlSelected.attributes['style']
      ? this.formatStyles.stringToObj(this.ctrlSelected.attributes['style'])
      : {};
    let {
      'border-width': borderWidth = '',
      'border-radius': borderRadius = ''
    } = this.styleObj;
    const {
      'border-style': borderStyle = '',
      'border-color': borderColor = ''
    } = this.styleObj;
    borderWidth = this.getNumValueNoPX(borderWidth);
    borderRadius = this.getNumValueNoPX(borderRadius);
    this.formGroup.setValue(
      {
        borderWidth: borderWidth,
        borderStyle: borderStyle,
        borderColor: borderColor,
        borderRadius: borderRadius
      },
      { emitEvent: false }
    );
  }

  getNumValueNoPX(value): number {
    return Number(value.replace('px', ''));
  }

  colorSelected(e) {
    const obj = {
      borderColor: e
    };
    this.formGroup.patchValue(obj);
  }
}
