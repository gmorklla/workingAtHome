import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-g',
  templateUrl: './input-g.component.html',
  styleUrls: ['./input-g.component.css']
})
export class InputGComponent implements OnInit {
  ctrl;
  styleObj;

  constructor() {}

  ngOnInit() {
    this.styleObj = this.stringToObj(this.ctrl.attributes.style);
  }

  stringToObj(styles: string): { [key: string]: any } {
    const styleObj = styles
      .split(';')
      .filter(val => val !== '')
      .map(val => {
        const idx = val.search(':');
        const prop = val.slice(0, idx);
        const value = val.slice(idx + 1);
        const obj = {};
        obj[prop] = value;
        return obj;
      })
      .reduce((prev, curr) => {
        return { ...prev, ...curr };
      });
    return styleObj;
  }
}
