import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { InputButtonService } from './input-button.service';
import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { EventEmitterService } from 'projects/banorte/src/app/shared/services/event-emitter.service';
import { displayValue } from 'projects/banorte/src/app/shared/data/controlesDefault';

// [ngClass]="{ selected: i === ctrlIdxSelected }"
//   [cdkDragLockAxis] = "lockAxis"

@Component({
  selector: 'lib-inputButton',
  template: `
    <button
      mat-raised-button
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
    >
      {{ valor }}
    </button>
  `,
  styleUrls: ['./input-button.css']
})
export class InputButtonComponent implements OnInit {
  @Input() ctrl;
  @Output() rzStartE = new EventEmitter();
  @Output() rzStopE = new EventEmitter();
  @Output() dragEndE = new EventEmitter();
  public valor: string;
  public estilos;
  public lockAxis: string;

  constructor(
    private service: InputButtonService,
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
