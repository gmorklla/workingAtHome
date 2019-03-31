import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import { ControlModel } from '../../../banorteRender/src/app/shared/models/control/control.model';
import { RenderButtonService } from "./render-button.service";

@Component({
  selector: 'lib-renderButton',
  templateUrl: './render-button.component.html',
  styleUrls: ['./render-button.component.css']
})
export class RenderButtonComponent implements OnInit {

  @Input() public ctrl: ControlModel;

  public stylesObj: any;
  public value: string;

  constructor(private service: RenderButtonService) { }

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
