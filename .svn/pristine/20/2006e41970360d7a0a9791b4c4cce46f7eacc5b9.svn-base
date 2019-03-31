import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GetIconsService } from '../../../shared/services/get-icons.service';

@Component({
  selector: 'app-controles',
  templateUrl: './controles.component.html',
  styleUrls: ['./controles.component.css']
})
export class ControlesComponent implements OnInit {
  @Input() controlesHTML;
  @Output() emitControl = new EventEmitter();

  constructor(private getIcons: GetIconsService) {}

  ngOnInit() {}

  getIcon(i) {
    return this.getIcons.getIcon(i);
  }

  getControlString(control) {
    return JSON.stringify(control);
  }

  setControl(e, control) {
    this.emitControl.emit(control);
  }
}
