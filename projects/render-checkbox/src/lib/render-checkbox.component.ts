import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import { ControlModel } from '../../../banorteRender/src/app/shared/models/control/control.model';
import { RenderCheckboxService } from './render-checkbox.service';

@Component({
  selector: 'lib-render-checkbox',
  templateUrl: './render-checkbox.component.html',
  styleUrls: ['./render-checkbox.component.css']
})
export class RenderCheckboxComponent implements OnInit {

  @Input()
  public ctrl: ControlModel;

  public stylesObj: any;
  public value: string;

  constructor(private service: RenderCheckboxService) {

  }

  ngOnInit() {
    this.renderCtrl();
  }

  public renderCtrl(): void {
    if (this.ctrl) {

      const {
        attributes: { value, style }
      } = this.ctrl;

      // El string debe convertirse a objeto para el [ngStyle]
      const stylesObj: any = style ? this.service.stringToObj(style) : {};

      this.stylesObj = this.service.styleReOrder(stylesObj, this.ctrl.attributes.href);

      this.value = value ? value : this.ctrl.type;
    }
  }

  public change(e: any): void {
    if (e.srcElement.checked === true) {
      this.stylesObj['background-position-x'] = 'left';
    } else {
      this.stylesObj['background-position-x'] = 'right';
    }
  }

}
