import { Injectable } from '@angular/core';
import { RadioStyleModel } from "./models/radio-style/radio-style.model";


@Injectable({
  providedIn: 'root'
})
export class InputRadioService {

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

  public generateStyleRadio(width: number, height: number, link: string): RadioStyleModel {
    // Esta función es responsable de generar la estructura para el checkbox ya que se le ha introducido una img

    const resultado: RadioStyleModel = {
      '-webkit-appearance': 'none',
      'width': `${width}px`, // Lo que mida 'width'
      'height': `${height}px`, // Lo que mida 'height'
      'background-image': `url(${link})`,
      'background-repeat': 'no-repeat',
      'background-size': `${this.generateRadioBackGroundSize(width)}px`, // Las medidas de 'width' y 'height' multiplocado por 2
      'background-position-x': 'left'
    }
    return resultado;
  }

  public generateRadioBackGroundSize(width: number): number {
    const result: number = Number(width) * 2;
    return result;
  }

}
