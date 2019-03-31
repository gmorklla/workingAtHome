import { Component, OnInit, Input } from '@angular/core';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { InputRangeService } from '../input-range.service';

@Component({
  selector: 'lib-form-range',
  templateUrl: './form-range.component.html',
  styleUrls: ['./form-range.component.css']
})
export class FormRangeComponent implements OnInit {
  @Input() ctrl;
  autoTicks;
  disabled;
  max;
  min;
  showTicks;
  step;
  thumbLabel;
  value;
  vertical;

  get tickInterval(): number | 'auto' {
    return this.showTicks ? (this.autoTicks ? 'auto' : this._tickInterval) : 0;
  }
  set tickInterval(value) {
    this._tickInterval = coerceNumberProperty(value);
  }
  private _tickInterval = 1;

  constructor(private service: InputRangeService) {}

  ngOnInit() {
    if (this.ctrl) {
      const {
        attributes: {
          autoTicks = false,
          disabled = false,
          max = 100,
          min = 0,
          showTicks = false,
          step = 1,
          thumbLabel = false,
          value = 0,
          vertical = false,
          style
        }
      } = this.ctrl;
      const estilos = style ? this.service.stringToObj(style) : {};
      this.autoTicks = JSON.parse(autoTicks);
      this.disabled = JSON.parse(disabled);
      this.max = Number(max);
      this.min = Number(min);
      this.showTicks = JSON.parse(showTicks);
      this.step = Number(step);
      this.thumbLabel = JSON.parse(thumbLabel);
      // this.value = Number(value);
      this.vertical = JSON.parse(vertical);
    }
  }

  onChange(e, element: string) {
    const obj = {
      autoTicks: this.autoTicks,
      disabled: this.disabled,
      max: this.max,
      min: this.min,
      showTicks: this.showTicks,
      step: this.step,
      thumbLabel: this.thumbLabel,
      vertical: this.vertical
    };
    this.service.emitChange.next(obj);
  }

  getNumValueNoPX(value): number {
    return Number(value.replace('px', ''));
  }
}
