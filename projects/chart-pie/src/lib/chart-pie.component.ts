import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { ThresholdColorService } from 'projects/threshold-color/src/public_api';
import { PieChart } from './PieChart';

@Component({
  selector: 'lib-chart-pie',
  templateUrl: './chart-pie.component.html',
  styleUrls: ['./chart-pie.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartPieComponent implements OnInit, OnChanges {
  @Input()
  data: PieChart[];
  colorScheme;
  color = 'gray';

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

  formatV(e) {
    return e + '%';
  }

  setColor() {
    this.color = this.thColor.getThColor({
      value: Number(this.data[0].value),
      critical: 25,
      major: 50,
      type: '<'
    });
    this.colorScheme = { domain: [this.color] };
  }
}
