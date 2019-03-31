import {Component, Input, OnInit} from '@angular/core';
import { RenderFileService } from './render-file.service';
import {ControlModel} from "../../../banorteRender/src/app/shared/models/control/control.model";

@Component({
  selector: 'lib-renderFile',
  templateUrl: './render-file.component.html',
  styleUrls: ['./render-file.component.css']
})
export class RenderFileComponent implements OnInit {

  @Input() public ctrl: ControlModel;

  public stylesObj: any;
  public value: string;

  constructor(private service: RenderFileService) { }

  ngOnInit() {
    if (this.ctrl) {
      console.log('this.ctrl');
      console.log(this.ctrl);
      const {
        attributes: { style, value }
      } = this.ctrl;
      this.stylesObj = style ? this.service.stringToObj(style) : {};
      this.value = value;
    }
  }

}
