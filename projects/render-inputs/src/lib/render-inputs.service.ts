import { Injectable } from '@angular/core';
import { StyleModel } from '../../../render-checkbox/src/lib/models/style/style.model';

@Injectable({
  providedIn: 'root'
})
export class RenderInputsService {

  constructor() {
  }

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
          return {...prev, ...curr};
        });

      return styleObj;
    }
  }

}
