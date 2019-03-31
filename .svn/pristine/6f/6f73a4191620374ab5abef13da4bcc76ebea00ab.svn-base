import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface BackgroundFormI {
  color1: string;
  color2: string;
  gradient: boolean;
  linearRadial: string;
  image: string;
  useImg: boolean;
  repeat: boolean;
  x: boolean;
  y: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class BackgroundService {
  formChange$ = new Subject<any>();

  constructor() {}

  formatCssForm(data: BackgroundFormI) {
    const fondo = `${data.color1}`;
    const gradient =
      data.linearRadial === 'linear'
        ? `linear-gradient(to bottom right, ${data.color1}, ${data.color2})`
        : `radial-gradient(${data.color1}, ${data.color2})`;
    const imagen = `url("${data.image}")`;
    const repetir = data.repeat
      ? data.x && data.y
        ? `repeat`
        : data.x
        ? `repeat-x`
        : `repeat-y`
      : `no-repeat`;
    let background = ``;
    if (data.gradient) {
      background += `${gradient} `;
    } else {
      background += `${fondo} `;
    }
    if (data.useImg) {
      background += `${imagen} ${repetir}`;
    }
    const cssObj = {
      background: background
    };
    return cssObj;
  }

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
