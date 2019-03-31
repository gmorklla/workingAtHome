import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'lib-number-card',
  template: `
    <div class="container">
      <ngx-charts-number-card
        [scheme]="colorScheme"
        [results]="data"
        [innerPadding]="2"
        (select)="onSelect($event)"
      >
      </ngx-charts-number-card>
    </div>
  `,
  styleUrls: ['./number-card.component.css']
})
export class NumberCardComponent implements OnInit {
  @Input()
  data = [];
  colorScheme = {
    domain: ['whitesmoke', 'slategrey', 'steelblue']
  };
  constructor() {}

  ngOnInit() {}

  onSelect(e) {
    console.log(e);
  }
}
