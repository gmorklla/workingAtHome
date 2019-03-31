import {Component, Input, OnInit} from '@angular/core';
import {ControlModel} from "../../../banorteRender/src/app/shared/models/control/control.model";
import {RenderIframeService} from "./render-iframe.service";

@Component({
  selector: 'lib-renderIframe',
  templateUrl: './render-iframe.component.html',
  styleUrls: ['./render-iframe.component.css']
})
export class RenderIframeComponent implements OnInit {

  @Input() public ctrl: ControlModel;

  public stylesObj: any;
  public src: string;

  constructor(private service: RenderIframeService) { }

  ngOnInit() {
    if (this.ctrl) {
      const {
        attributes: { style, src }
      } = this.ctrl;
      this.src = src;
      this.stylesObj = style ? this.service.stringToObj(style) : {};
    }
  }

}
