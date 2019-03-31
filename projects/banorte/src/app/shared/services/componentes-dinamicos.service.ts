import { Injectable } from '@angular/core';
import { InputButtonComponent } from 'projects/input-button/src/public_api';
import { FormInputButtonComponent } from 'projects/input-button/src/public_api';
import { DivMessageComponent } from 'projects/div-message/src/public_api';
import { FormDivMessageComponent } from 'projects/div-message/src/public_api';

@Injectable({
  providedIn: 'root'
})
export class ComponentesDinamicosService {
  componentes = [
    {
      tag: 'input',
      type: 'button',
      component: InputButtonComponent
    },
    {
      tag: 'div',
      type: 'div',
      component: DivMessageComponent
    }
  ];
  forms = [
    {
      tag: 'input',
      type: 'button',
      component: FormInputButtonComponent
    },
    {
      tag: 'div',
      type: 'div',
      component: FormDivMessageComponent
    }
  ];

  constructor() {}

  getComponentToRender(control) {
    const componentToRender = this.componentes.filter(
      val => val.tag === control.tag && val.type === control.type
    )[0];
    return componentToRender.component;
  }

  getFormToRender(control) {
    const componentToRender = this.forms.filter(
      val => val.tag === control.tag && val.type === control.type
    )[0];
    return componentToRender.component;
  }
}
