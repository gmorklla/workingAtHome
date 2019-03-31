import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThresholdColorService {
  constructor() {}

  getThColor(input: ThColor): string {
    let color = '';
    if (input.type === '<') {
      color =
        input.value <= input.critical
          ? 'crimson'
          : input.value <= input.major
            ? 'orange'
            : 'yellowgreen';
    } else {
      color =
        input.value >= input.critical
          ? 'crimson'
          : input.value >= input.major
            ? 'orange'
            : 'yellowgreen';
    }
    return color;
  }
}

export interface ThColor {
  value: number;
  critical: number;
  major: number;
  type: string;
}
