import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { InputGeneralService } from './input-general.service';
import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { EventEmitterService } from 'projects/banorte/src/app/shared/services/event-emitter.service';
import { displayValue } from 'projects/banorte/src/app/shared/data/controlesDefault';

@Component({
  selector: 'lib-inputGeneral',
  templateUrl: 'input-general.html',
  styleUrls: ['./input-general.css']
})
export class InputGeneralComponent implements OnInit {
  @Input() ctrl;
  @Output() rzStartE = new EventEmitter();
  @Output() rzStopE = new EventEmitter();
  @Output() dragEndE = new EventEmitter();
  public width: number;
  public height: number;
  public valor: string;
  public stylesObj;
  public containerStyles;
  public lockAxis: string;

  constructor(
    private service: InputGeneralService,
    private emitterS: EventEmitterService
  ) {}

  ngOnInit() {
    if (this.ctrl) {
      const {
        attributes: { value, style, placeholder }
      } = this.ctrl;
      this.stylesObj = style ? this.service.stringToObj(style) : {};
      this.containerStyles = this.setStylesOfContainer();
      const {
        position = null,
        transform = null,
        width = null,
        height = null
      } = this.stylesObj;
      // tslint:disable:no-unused-expression
      position && this.deleteProp('position');
      transform && this.deleteProp('transform');
      width && this.deleteProp('width');
      height && this.deleteProp('height');
      this.valor = value ? value : displayValue[this.ctrl.type];
    }
    // LockAxis
    this.emitterS.lockAxisS.subscribe(lock => (this.lockAxis = lock));
  }

  deleteProp(prop: string) {
    delete this.stylesObj[prop];
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
    } = this.stylesObj;
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
