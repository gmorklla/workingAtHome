import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import { ControlModel } from '../../../banorteRender/src/app/shared/models/control/control.model';
import { RenderImageService } from './render-image.service';

@Component({
  selector: 'lib-renderImage',
  templateUrl: './render-image.component.html',
  styleUrls: ['./render-image.component.css']
})
export class RenderImageComponent implements OnInit {

  @Input() public ctrl: ControlModel;

  public stylesObj: any;
  public source: string;

  constructor(private service: RenderImageService) { }

  ngOnInit() {
    if (this.ctrl) {
      const {
        attributes: { style, src }
      } = this.ctrl;

      this.source = src;
      this.stylesObj = style ? this.service.stringToObj(style) : {};
    }
  }

}
