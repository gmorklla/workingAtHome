import { Component, Input, OnInit } from '@angular/core';
import { ControlModel } from '../../../banorteRender/src/app/shared/models/control/control.model';
import { RenderRangeService } from './render-range.service';
import { coerceNumberProperty } from '@angular/cdk/coercion';

@Component({
  selector: 'lib-renderRange',
  templateUrl: './render-range.component.html',
  styleUrls: ['./render-range.component.css']
})
export class RenderRangeComponent implements OnInit {

  @Input() public ctrl: ControlModel;

  public stylesObj: any;

  public value: number;
  public min: number;
  public max: number;
  public step: number;

  public autoTicks: boolean;
  public showTicks: boolean;
  public thumbLabel: boolean;

  // public showMinMax: string;


  constructor(private service: RenderRangeService) { }

  ngOnInit()  {
    if (this.ctrl) {
      const {
        attributes: { style, value, min, max, step, /*showMinMax,*/ thumbLabel, showTicks }
      } = this.ctrl;

      this.min = min;
      this.max = max;
      this.step = step;
      this.stylesObj = style ? this.service.stringToObj(style) : {};
      this.value = value;
      // this.showMinMax = showMinMax;
      this.thumbLabel = thumbLabel;
      this.showTicks = showTicks;
    }
  }

  get tickInterval(): number | 'auto' {
    return this.showTicks ? (this.autoTicks ? 'auto' : this._tickInterval) : 0;
  }

  set tickInterval(value) {
    this._tickInterval = coerceNumberProperty(value);
  }

  private _tickInterval = 1;

}
