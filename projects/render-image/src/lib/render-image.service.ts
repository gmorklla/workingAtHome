import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RenderImageService {

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


      // [Ini] TODO Parche temporal para solucionar lo de los px que se repiten en algunos quedando así: pxpx
      if (!styleObj['width'].includes('px')) {
        styleObj['width'] = styleObj['width'] + 'px';
      }

      if (!styleObj['height'].includes('px')) {
        styleObj['height'] = styleObj['height'] + 'px';
      }
      // [end]

      return styleObj;
    }
  }

}
