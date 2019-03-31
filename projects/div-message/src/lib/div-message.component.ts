import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DivMessageService } from './div-message.service';
import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { displayValue } from 'projects/banorte/src/app/shared/data/controlesDefault';
import { EventEmitterService } from 'projects/banorte/src/app/shared/services/event-emitter.service';

@Component({
  selector: 'lib-div-message',
  templateUrl: './div-message.html',
  styleUrls: ['./div-message.css']
})
export class DivMessageComponent implements OnInit {
  @Input() ctrl;
  @Output() rzStartE = new EventEmitter();
  @Output() rzStopE = new EventEmitter();
  @Output() dragEndE = new EventEmitter();
  valor: string;
  estilos;
  lockAxis: string;

  constructor(
    private service: DivMessageService,
    private emitterS: EventEmitterService
  ) {}

  ngOnInit() {
    if (this.ctrl) {
      const {
        attributes: { value, style, placeholder }
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
    const transform = event.source.element.nativeElement.style.transform;
    this.dragEndE.emit(transform);
  }
}
