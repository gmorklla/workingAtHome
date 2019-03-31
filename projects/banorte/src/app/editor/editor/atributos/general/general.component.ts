import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  OnChanges
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EventEmitterService } from 'projects/banorte/src/app/shared/services/event-emitter.service';
import { FormatStylesService } from 'projects/banorte/src/app/shared/services/format-styles.service';
import {
  distinctUntilChanged,
  debounceTime,
  switchMap,
  filter,
  tap
} from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent implements OnInit, OnChanges {
  @Input() ctrlSelected;
  formGroup: FormGroup;
  styleObj: any;
  toCompare: string;

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
      width: ['', [Validators.required]],
      height: ['', [Validators.required]],
      x: ['', [Validators.required]],
      y: ['', [Validators.required]]
    });
  }

  listenForm(): any {
    this.formGroup.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(1000),
        switchMap(val => of(val)),
        filter(val => JSON.stringify(val) !== this.toCompare),
        tap(val => (this.toCompare = JSON.stringify(val))),
        switchMap(val => of(this.formatToEmit(val)))
      )
      .subscribe(val => {
        this.emitterS.dispatchStyle(val);
      });
  }

  formatToEmit(estilos) {
    const { x, y } = estilos;
    const transform = `translate3d(${x}px,${y}px,0)`;
    const copiaEstilos = { ...estilos };
    delete copiaEstilos.x;
    delete copiaEstilos.y;
    copiaEstilos.transform = transform;
    copiaEstilos.width = `${copiaEstilos.width}px`;
    copiaEstilos.height = `${copiaEstilos.height}px`;
    return copiaEstilos;
  }

  getGeneralFormValues(val: any): any {
    const { width = null, height = null, x = null, y = null } = val;
    const style = {
      width: width,
      height: height,
      x: x,
      y: y
    };
    return style;
  }

  setFormValues(): any {
    this.styleObj = this.ctrlSelected.attributes['style']
      ? this.formatStyles.stringToObj(this.ctrlSelected.attributes['style'])
      : {};
    let { width = '150', height = '60' } = this.styleObj;
    const { transform = 'translate3d(0,0,0)' } = this.styleObj;
    const coords = transform
      .slice(transform.indexOf('(') + 1, transform.indexOf(')'))
      .split(',');
    const x = this.getNumValueNoPX(coords[0]);
    const y = this.getNumValueNoPX(coords[1]);
    width = this.getNumValueNoPX(width);
    height = this.getNumValueNoPX(height);
    this.formGroup.setValue(
      {
        width: width,
        height: height,
        x: x,
        y: y
      },
      { emitEvent: false }
    );
  }

  getNumValueNoPX(value): number {
    return Number(value.replace('px', ''));
  }
}
