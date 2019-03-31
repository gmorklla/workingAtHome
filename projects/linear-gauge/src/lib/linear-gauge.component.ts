import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-linear-gauge',
  templateUrl: './linear-gauge.component.html',
  styleUrls: ['./linear-gauge.component.css']
})
export class LinearGaugeComponent implements OnInit {
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C']
  };

  constructor() {}

  ngOnInit() {}

  onSelect(event) {
    console.log(event);
  }
}
