import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { distinctUntilChanged, debounceTime, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { EventEmitterService } from 'projects/banorte/src/app/shared/services/event-emitter.service';
import { FormatStylesService } from 'projects/banorte/src/app/shared/services/format-styles.service';
import { FontInstitutionalModel } from '../../../../models/font-institutional/font-institutional.model';

@Component({
  selector: 'app-texto',
  templateUrl: './texto.component.html',
  styleUrls: ['./texto.component.css']
})
export class TextoComponent implements OnInit, OnChanges {
  formGroup: FormGroup;
  @Input() ctrlSelected;
  styleObj: any;
  public fonts: FontInstitutionalModel[];
  public color;

  constructor(
    private fb: FormBuilder,
    private emitterS: EventEmitterService,
    private formatStyles: FormatStylesService
  ) {
    this.fonts = [
      { name: 'Gotham bold', value: 'GothamBold' },
      { name: 'Gotham book', value: 'GothamBook' },
      { name: 'Gotham book', value: 'GothamBook' },
      { name: 'Gotham medium', value: 'GothamMedium' },
      { name: 'Gotham medium', value: 'GothamMedium' },
      { name: 'Gotham light regular', value: 'GothamLightRegular' },
      { name: 'Roboto medium', value: 'RobotoMedium' },
      { name: 'Roboto medium', value: 'RobotoMedium' },
      { name: 'Roboto regular', value: 'RobotoRegular' },
      { name: 'Roboto regular', value: 'RobotoRegular' },
      { name: 'Roboto regular', value: 'RobotoRegular}' }
    ];
  }

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
      color: [''],
      fontSize: ['', Validators.required],
      textAlign: ['', Validators.required],
      fontFamily: ['', Validators.required],
      fontStyle: ['', [Validators.required]],
      lineHeight: ['', [Validators.required]],
      fontWeight: ['']
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
        const objToEmit = this.getFormValues(val);
        this.emitterS.dispatchStyle(objToEmit);
      });
  }

  getFormValues(val: any): any {
    const {
      color = null,
      fontSize = null,
      textAlign = null,
      fontFamily = null,
      fontStyle = null,
      lineHeight = null,
      fontWeight = null
    } = val;
    const style = {
      color: color ? color : null,
      'font-size': fontSize ? fontSize + 'px' : null,
      'text-align': textAlign,
      'font-family': fontFamily,
      'font-style': fontStyle,
      'line-height': lineHeight ? lineHeight + 'px' : null,
      'font-weight': fontWeight
    };
    return style;
  }

  setFormValues(): any {
    this.styleObj = this.ctrlSelected.attributes['style']
      ? this.formatStyles.stringToObj(this.ctrlSelected.attributes['style'])
      : {};
    let {
      'font-size': fontSize = '12',
      'line-height': lineHeight = '12'
    } = this.styleObj;
    const {
      color = 'rgba(0,0,0,1)',
      'text-align': textAlign = 'left',
      'font-family': fontFamily = 'Arial, Helvetica, sans-serif',
      'font-style': fontStyle = 'normal',
      'font-weight': fontWeight = 'normal'
    } = this.styleObj;
    fontSize = this.getNumValueNoPX(fontSize);
    lineHeight = this.getNumValueNoPX(lineHeight);
    this.formGroup.setValue(
      {
        color: color,
        fontSize: fontSize,
        textAlign: textAlign,
        fontFamily: fontFamily,
        fontStyle: fontStyle,
        lineHeight: lineHeight,
        fontWeight: fontWeight
      },
      { emitEvent: false }
    );
  }

  colorSelected(e) {
    this.formGroup.patchValue({ color: e });
  }

  getNumValueNoPX(value): number {
    return Number(value.replace('px', ''));
  }
}
