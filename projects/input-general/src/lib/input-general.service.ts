import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InputGeneralService {
  constructor() {}

  stringToObj(styles: string): { [key: string]: any } {
    if (styles) {
      const styleObj = styles
        .split(';')
        .filter(val => val !== '')
        .map(val => {
          const arr = val.split(':');
          const obj = {};
          obj[arr[0]] = arr[1];
          return obj;
        })
        .reduce((prev, curr) => {
          return { ...prev, ...curr };
        });
      return styleObj;
    }
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
