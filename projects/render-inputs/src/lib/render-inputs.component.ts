import { Component, Input, OnInit } from '@angular/core';
import { ControlModel } from '../../../banorteRender/src/app/shared/models/control/control.model';
import { RenderInputsService } from './render-inputs.service';

@Component({
  selector: 'lib-renderInputs',
  templateUrl: './render-inputs.component.html',
  styleUrls: ['./render-inputs.component.css']
})
export class RenderInputsComponent implements OnInit {
  @Input() public ctrl: ControlModel;

  public stylesObj: any;
  public value: string;
  public placeholder: string;

  constructor(private service: RenderInputsService) {}

  ngOnInit() {
    if (this.ctrl) {
      const {
        attributes: { value, style }
      } = this.ctrl;

      this.placeholder = value;

      // El string debe convierte a objeto para el [ngStyle]
      this.stylesObj = style ? this.service.stringToObj(style) : {};

      this.value = value ? value : this.ctrl.type;
    }
  }
}
