import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RenderAService {

  constructor() { }

  stringToObj(styles: string): { [key: string]: any } {
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
