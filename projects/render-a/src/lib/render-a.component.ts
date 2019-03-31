import { Component, Input, OnInit } from '@angular/core';
import { ControlModel } from '../../../banorteRender/src/app/shared/models/control/control.model';
import { RenderAService } from './render-a.service';

@Component({
  selector: 'lib-renderA',
  templateUrl: './render-a.component.html',
  styleUrls: ['./render-a.component.css']
})
export class RenderAComponent implements OnInit {

  @Input() public ctrl: ControlModel;

  public stylesObj: any;
  public href: string;
  public value: string;

  constructor(private service: RenderAService) { }

  ngOnInit() {
    if (this.ctrl) {
      const {
        attributes: { style, href, value  }
      } = this.ctrl;
      this.href = href;
      this.stylesObj = style ? this.service.stringToObj(style) : {};
      this.value = value? value: 'http://localhost:4200/layout/design/86/window/478'
    }
  }

}
