import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RenderSelectService {

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

  parseObjToArr(objOptions: any): any[] {

    const resultado: any[] = Object
      .keys(objOptions)
      .map(key => {

        const obj: any = {};

        obj.viewValue = key;
        obj.value = objOptions[key];

        return obj;
      });

    return resultado;
  }
}
