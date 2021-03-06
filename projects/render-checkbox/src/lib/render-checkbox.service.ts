import { Injectable } from '@angular/core';
import {StyleModel} from "./models/style/style.model";

@Injectable({
  providedIn: 'root'
})
export class RenderCheckboxService {

  constructor() { }

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

      const width: number = (this.getNumValueNoPX(styleObj['width'])) * (2);
      styleObj['background-size'] = `${width}px`;

      return styleObj;
    }
  }

  getNumValueNoPX(value): number {
    return Number(value.replace('px', ''));
  }

  styleReOrder(stylesObj: any, href: string): StyleModel {

    const resultado: StyleModel = {
      '-webkit-appearance': 'none',
      'width': stylesObj['width'],
      'position': stylesObj['position'],
      'height': stylesObj['height'],
      'background-image': `url(${href})`,
      'background-repeat': 'no-repeat',
      'background-size': stylesObj['background-size'],
      'background-position-x': 'right',
      'transform': stylesObj['transform'],
      'margin': '0px'
    };

    return resultado;
  }

}
