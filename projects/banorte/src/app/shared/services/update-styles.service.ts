import { Injectable } from '@angular/core';
import { ControlI } from '../data/data';
import { FormatStylesService } from './format-styles.service';
import { ctrlStyleMap } from 'projects/banorte/src/app/shared/data/controlesDefault';

@Injectable({
  providedIn: 'root'
})
export class UpdateStylesService {
  constructor(private formatStyles: FormatStylesService) {}

  update(estilos: { [key: string]: any }, control: ControlI): string {
    const styleObj = control.attributes['style']
      ? this.formatStyles.stringToObj(control.attributes['style'])
      : {};
    Object.entries(estilos).forEach(entry => {
      const key = entry[0];
      const value = entry[1];
      if (value) {
        styleObj[key] = value;
      }
    });
    const styleString = this.formatStyles.objToString(styleObj);
    return styleString;
  }
}
