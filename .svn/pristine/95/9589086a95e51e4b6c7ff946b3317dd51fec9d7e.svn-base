import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import { ControlModel } from '../../../banorteRender/src/app/shared/models/control/control.model';
import { RenderTextareaService } from './render-textarea.service';

@Component({
  selector: 'lib-render-textarea',
  templateUrl: './render-textarea.component.html',
  styleUrls: ['./render-textarea.component.css']
})
export class RenderTextareaComponent implements OnInit {

  @Input() public ctrl: ControlModel;

  public stylesObj: any;
  public value: string;

  constructor(private service: RenderTextareaService) { }

  ngOnInit() {
    if (this.ctrl) {
      const {
        attributes: { value, style }
      } = this.ctrl;

      // El string debe convierte a objeto para el [ngStyle]
      // TODO => El tamaño se ve un poco más grande lo que debería ser.
      this.stylesObj = style ? this.service.stringToObj(style) : {};

      this.value = value ? value : this.ctrl.type;
    }
  }

}
