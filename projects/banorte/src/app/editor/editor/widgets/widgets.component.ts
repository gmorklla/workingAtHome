import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GetIconsService } from '../../../shared/services/get-icons.service';

@Component({
  selector: 'app-widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.css']
})
export class WidgetsComponent implements OnInit {
  @Input() widgets;
  @Output() emitWidget = new EventEmitter();

  constructor(private getIcons: GetIconsService) {}

  ngOnInit() {}

  getIcon(i) {
    return this.getIcons.getIcon(i);
  }

  getControlString(widget) {
    return JSON.stringify(widget);
  }

  setWidget(e, widget) {
    this.emitWidget.emit(widget);
  }
}
