import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { ThresholdColorService } from 'projects/threshold-color/src/public_api';
import { BarChart } from './BarChart';

@Component({
  selector: 'lib-chart-bar',
  templateUrl: './chart-bar.component.html',
  styleUrls: ['./chart-bar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartBarComponent implements OnInit, OnChanges {
  @Input()
  data;
  colorScheme;
  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = false;
  xAxisLabel = 'Country';
  showYAxisLabel = false;
  yAxisLabel = 'Population';

  constructor(private thColor: ThresholdColorService) {}

  ngOnInit() {
    this.setColor();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data) {
      this.setColor();
    }
  }

  onSelect(event) {
    console.log(event);
  }

  setColor() {
    const obj = { value: 0, critical: 25, major: 50, type: '<' };
    const colors = this.data[0].series.map(val => {
      obj.value = val.value;
      return this.thColor.getThColor(obj);
    });
    this.colorScheme = { domain: colors };
  }
}
