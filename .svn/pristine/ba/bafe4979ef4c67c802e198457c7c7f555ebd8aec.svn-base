import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { WindowI} from '../../../shared/data/data';

@Component({
  selector: 'app-window-attributes',
  templateUrl: './window-attributes.component.html',
  styleUrls: ['./window-attributes.component.css']
})
export class WindowAttributesComponent implements OnInit {
  @Input() windowSelected: WindowI;

  @Output() propChange = new EventEmitter();


  constructor() {}

  ngOnInit() {}

  propChangeEmit(event) {
    this.propChange.emit(event);
  }
}
