import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import { ControlModel } from '../../../banorteRender/src/app/shared/models/control/control.model';
import { RenderRadioService } from './render-radio.service';

@Component({
  selector: 'lib-renderRadio',
  templateUrl: './render-radio.component.html',
  styleUrls: ['./render-radio.component.css']
})
export class RenderRadioComponent implements OnInit {

  @Input() public ctrl: ControlModel;

  public stylesObj: any;
  public value: string;
  public checked: boolean;

  constructor(private service: RenderRadioService) {
    this.checked = false;
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

      this.stylesObj = this.service.styleReOrder(stylesObj);


      this.value = value ? value : this.ctrl.type;
    }
  }

  public change(): void {
    if (this.checked === false) {
      this.checked = true;
      this.stylesObj['background-position-x'] = 'left';
    } else {
      this.checked = false;
      this.stylesObj['background-position-x'] = 'right';
    }
  }

}
