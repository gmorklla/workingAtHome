import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Pregunta} from './models/preguntas.model';
import {ControlHTML} from './models/controlHTML.model';


@Component({
  selector: 'lib-questions',
  templateUrl: './questions.component.html',
  styles: []
})
export class QuestionsComponent implements OnInit {
  @Output() public regresarControlHTML = new EventEmitter();

  @Input() public controlHTML: ControlHTML;
  @Input() public controlsHTML: ControlHTML[];
  @Input() public winIdCtrlSelect: string;

  public pregunta: Pregunta;

  constructor() {
  }

  ngOnInit() {
  }

  regresarPregunta() {
    this.regresarControlHTML.emit()
  }

}
