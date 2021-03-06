import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { ControlesI } from '../../../shared/data/data';

@Component({
  selector: 'app-atributos',
  templateUrl: './atributos.component.html',
  styleUrls: ['./atributos.component.css']
})
export class AtributosComponent implements OnInit {
  @Input() ctrlSelected: ControlesI;
  @Output() propChange = new EventEmitter();
  @Output() questionsChange = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  propChangeEmit(event) {
    this.propChange.emit(event);
  }

  obtenerControlHTML() {
    this.questionsChange.emit();
  }
}
