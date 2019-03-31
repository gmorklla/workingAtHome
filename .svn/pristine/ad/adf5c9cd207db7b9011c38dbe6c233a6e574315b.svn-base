import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { LinkService } from './link.service';
import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { EventEmitterService } from 'projects/banorte/src/app/shared/services/event-emitter.service';
import { displayValue } from 'projects/banorte/src/app/shared/data/controlesDefault';

@Component({
  selector: 'lib-link',
  template: `
    <a
      target="_blank"
      [ngStyle]="estilos"
      cdkDrag
      (cdkDragStarted)="clickOnCtrl($event)"
      (cdkDragEnded)="onDragEnd($event)"
      [cdkDragBoundary]="'.contenedor'"
      [cdkDragLockAxis]="lockAxis"
      ngResizable
      rzHandles="se"
      (rzStart)="clickOnCtrl($event)"
      (rzStop)="onResizeStop($event)"
      matTooltip="Control: {{ ctrl.type }} - {{ ctrl.id }}"
      [matTooltipPosition]="'above'"
      (click)="clickOnCtrl($event); $event.stopPropagation()"
      >{{ valor }}</a
    >
  `,
  styleUrls: ['./link.component.css']
})
export class LinkComponent implements OnInit {
  @Input() ctrl;
  @Output() rzStartE = new EventEmitter();
  @Output() rzStopE = new EventEmitter();
  @Output() dragEndE = new EventEmitter();
  public valor: string;
  public estilos;
  public textLink: string;
  public lockAxis: string;

  constructor(
    private service: LinkService,
    private emitterS: EventEmitterService
  ) {}

  ngOnInit() {
    if (this.ctrl) {
      const {
        attributes: { value, style }
      } = this.ctrl;
      this.estilos = style ? this.service.stringToObj(style) : {};
      this.valor =
        value && value.trim() !== ''
          ? value.trim()
          : displayValue[this.ctrl.type];
      this.textLink = this.ctrl.attributes.href
        ? this.ctrl.attributes.href
        : 'http://www.google.com';
    }
    // LockAxis
    this.emitterS.lockAxisS.subscribe(lock => (this.lockAxis = lock));
  }

  clickOnCtrl(e) {
    this.rzStartE.emit(this.ctrl);
  }

  onResizeStop(e) {
    this.rzStopE.emit(e.size);
  }

  onDragEnd(event: CdkDragEnd) {
    this.lockAxis = null;
    const transform = event.source.element.nativeElement.style.transform;
    this.dragEndE.emit(transform);
  }
}
