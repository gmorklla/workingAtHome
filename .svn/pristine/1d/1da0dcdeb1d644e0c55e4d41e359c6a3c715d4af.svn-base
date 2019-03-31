import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import { ControlModel } from '../../../banorteRender/src/app/shared/models/control/control.model';
import { RenderSelectService } from './render-select.service';

@Component({
  selector: 'lib-renderSelect',
  templateUrl: './render-select.component.html',
  styleUrls: ['./render-select.component.css']
})
export class RenderSelectComponent implements OnInit {

  @Input() public ctrl: ControlModel;

  public stylesObj: any;
  public value: string;
  public options: any;

  constructor(private service: RenderSelectService) { }

  ngOnInit() {
    if (this.ctrl) {

      this.options = [
        {key: 'a', value: 'Elige la opción 1'},
        {key: 'b', value: 'Elige la opción 2'},
        {key: 'c', value: 'Elige la opción 3'}
      ];

      const {
        attributes: { value, style }
      } = this.ctrl;

      // El string debe convierte a objeto para el [ngStyle]
      this.stylesObj = style ? this.service.stringToObj(style) : {};

      this.value = value ? value : this.ctrl.type;
    }
  }

}
