import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormatStylesService {
  constructor() {}

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

  objToString(styles: { [key: string]: any }): string {
    let str = '';
    Object.entries(styles).forEach(entry => {
      const key = entry[0];
      const value = entry[1];
      str += key + ':' + value + ';';
    });
    return str;
  }
}
