import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { InputFileService } from './input-file.service';
import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { EventEmitterService } from 'projects/banorte/src/app/shared/services/event-emitter.service';
import { displayValue } from 'projects/banorte/src/app/shared/data/controlesDefault';

@Component({
  selector: 'lib-inputFile',
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
      (click)="fileInput.click(); clickOnCtrl($event); $event.stopPropagation()"
    >
      <span class="inButton">
        {{ valor }}
        <mat-icon>attach_file</mat-icon>
      </span>
    </button>
    <input
      disabled
      hidden
      (change)="onFileSelected()"
      #fileInput
      type="file"
      id="file"
    />
  `,
  styleUrls: ['./input-file.css']
})
export class InputFileComponent implements OnInit {
  @Input() ctrl;
  @Output() rzStartE = new EventEmitter();
  @Output() rzStopE = new EventEmitter();
  @Output() dragEndE = new EventEmitter();
  public valor: string;
  public estilos;
  public lockAxis: string;

  constructor(
    private service: InputFileService,
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

  onFileSelected() {
    const inputNode: any = document.querySelector('#file');
    if (typeof FileReader !== 'undefined') {
      const reader = new FileReader();
      reader.onloadstart = (e: any) => {
        this.valor = inputNode.files[0].name;
      };
      reader.readAsArrayBuffer(inputNode.files[0]);
    }
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
