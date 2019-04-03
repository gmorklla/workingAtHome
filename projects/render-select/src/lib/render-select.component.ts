import {Component, Input, OnInit} from '@angular/core';
import {ControlModel} from '../../../banorteRender/src/app/shared/models/control/control.model';
import {RenderSelectService} from './render-select.service';

@Component({
  selector: 'lib-renderSelect',
  templateUrl: './render-select.component.html',
  styleUrls: ['./render-select.component.css']
})
export class RenderSelectComponent implements OnInit {

  @Input() ctrl: ControlModel;

  stylesObj: any;
  value: string;
  options: any;

  constructor(private service: RenderSelectService) {
  }

  ngOnInit() {

    this.stylesObj = this.service.stringToObj(this.ctrl.attributes.style);
    this.value = this.ctrl.type;
    this.options = this.service.parseObjToArr(this.ctrl.options);

  }
}
