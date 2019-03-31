import {Component, Input, OnInit} from '@angular/core';
import { RenderDivMessageService } from './render-div-message.service';
import { ControlModel } from '../../../banorteRender/src/app/shared/models/control/control.model';

@Component({
  selector: 'lib-render-div-message',
  templateUrl: './render-div-message.component.html',
  styles: []
})
export class RenderDivMessageComponent implements OnInit {

  @Input() public ctrl: ControlModel;

  public stylesObj: any;
  public value: string;

  constructor(private service: RenderDivMessageService) { }

  ngOnInit() {
    if (this.ctrl) {
      const {
        attributes: { value, style }
      } = this.ctrl;

      // El string debe convierte a objeto para el [ngStyle]
      this.stylesObj = style ? this.service.stringToObj(style) : {};

      this.value = value ? value : this.ctrl.type;
    }
  }

}
