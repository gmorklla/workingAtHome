import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { ImageComponentService } from './image-component.service';
import { EventEmitterService } from 'projects/banorte/src/app/shared/services/event-emitter.service';

@Component({
  selector: 'lib-imageComponent',
  templateUrl: './image-component.html',
  styleUrls: ['./image-component.css']
})
export class ImageComponentComponent implements OnInit {
  @Input() ctrl;
  @Output() rzStartE = new EventEmitter();
  @Output() rzStopE = new EventEmitter();
  @Output() dragEndE = new EventEmitter();
  public source: string;
  public estilos;
  public width: number;
  public height: number;
  public valor: string;
  public containerStyles;
  public lockAxis: string;

  constructor(
    private service: ImageComponentService,
    private emitterS: EventEmitterService
  ) {}

  ngOnInit() {
    if (this.ctrl) {
      const {
        attributes: { value, style, src }
      } = this.ctrl;
      this.source = src
        ? src
        : 'http://lnxsapl1d.dev.unix.banorte.com:9080/uf-ui-managment/assets/images/banorteLogo.jpg';
      this.estilos = style ? this.service.stringToObj(style) : {};
      this.containerStyles = this.setStylesOfContainer();
      const {
        position = null,
        transform = null,
        width = null,
        height = null
      } = this.estilos;
      // tslint:disable:no-unused-expression
      position && this.deleteProp('position');
      transform && this.deleteProp('transform');
      width && this.deleteProp('width');
      height && this.deleteProp('height');
    }
    // LockAxis
    this.emitterS.lockAxisS.subscribe(lock => (this.lockAxis = lock));
  }

  deleteProp(prop: string) {
    delete this.estilos[prop];
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
      width = '100px',
      height = '100px',
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
