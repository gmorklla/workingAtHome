import { element } from 'protractor';
import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { InputRangeService } from './input-range.service';
import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { EventEmitterService } from 'projects/banorte/src/app/shared/services/event-emitter.service';

interface InputRangeCtrlModel {
  id: number;
  name: string;
  type: string;
  attributes: {
    min: string;
    max: string;
    style: string;
    step: string;
    value: string;
    showMinMax: string;
  };
  options: any;
  tag: string;
}

@Component({
  selector: 'lib-input-range',
  templateUrl: './input-range.component.html',
  styleUrls: ['./input-range.component.css']
})
export class InputRangeComponent implements OnInit {
  @Input() public ctrl;
  @Output() rzStartE = new EventEmitter();
  @Output() rzStopE = new EventEmitter();
  @Output() dragEndE = new EventEmitter();
  public autoTicks: boolean;
  public disabled: boolean;
  public invert: boolean;
  public max: number;
  public min: number;
  public showTicks: boolean;
  public step: number;
  public thumbLabel: boolean;
  public value: number;
  public vertical: boolean;
  public stylesObj: any;
  public estilos;
  public width: number;
  public height: number;
  public showMinMax: string;
  public containerStyles;
  public lockAxis: string;
  get tickInterval(): number | 'auto' {
    return this.showTicks ? (this.autoTicks ? 'auto' : this._tickInterval) : 0;
  }
  set tickInterval(value) {
    this._tickInterval = coerceNumberProperty(value);
  }
  private _tickInterval = 1;

  constructor(
    private service: InputRangeService,
    private emitterS: EventEmitterService
  ) {}

  ngOnInit() {
    if (this.ctrl) {
      const {
        attributes: {
          style,
          autoTicks = false,
          disabled = false,
          max = 100,
          min = 0,
          showTicks = false,
          step = 1,
          thumbLabel = false,
          value = 0,
          vertical = false
        }
      } = this.ctrl;
      this.estilos = style ? this.service.stringToObj(style) : {};
      this.containerStyles = this.setStylesOfContainer();
      delete this.estilos.position;
      delete this.estilos.transform;
      delete this.estilos.width;
      delete this.estilos.height;
      this.autoTicks = JSON.parse(autoTicks);
      this.disabled = JSON.parse(disabled);
      this.max = Number(max);
      this.min = Number(min);
      this.showTicks = JSON.parse(showTicks);
      this.step = Number(step);
      this.thumbLabel = JSON.parse(thumbLabel);
      // this.value = Number(value);
      this.vertical = JSON.parse(vertical);
    }
    this.service.emitChange.subscribe(e =>
      Object.keys(e).forEach(attr => (this[attr] = e[attr]))
    );
    // LockAxis
    this.emitterS.lockAxisS.subscribe(lock => (this.lockAxis = lock));
  }

  clickOnCtrl(e) {
    this.rzStartE.emit(this.ctrl);
  }

  onResizeStop(e) {
    this.width = e.size.width;
    this.height = e.size.height;
    this.rzStopE.emit(e.size);
  }

  onDragEnd(event: CdkDragEnd) {
    this.lockAxis = null;
    const transform = event.source.element.nativeElement.style.transform;
    this.dragEndE.emit(transform);
  }

  // Obtiene estilos que deben aplicarse al contenedor
  setStylesOfContainer() {
    const {
      width = '150px',
      height = '60px',
      transform = 'translate3d(0,0,0)'
    } = this.estilos;
    this.width = this.getNumValueNoPX(width);
    this.height = this.getNumValueNoPX(height);
    const fObj = {
      transform: transform,
      position: 'absolute'
    };
    return { ...fObj };
  }

  getNumValueNoPX(value): number {
    return Number(value.replace('px', ''));
  }
}
