import {
  ComponentFactoryResolver,
  Directive,
  Input,
  OnInit,
  ViewContainerRef
} from '@angular/core';
import { ControlModel } from '../models/control/control.model';
import { RenderInputsComponent } from 'projects/render-inputs/src/public_api';
import { RenderButtonComponent } from 'projects/render-button/src/public_api';
import { RenderSelectComponent } from 'projects/render-select/src/public_api';
import { RenderDivMessageComponent } from 'projects/render-div-message/src/public_api';
import { RenderImageComponent } from 'projects/render-image/src/public_api';
import { RenderTextareaComponent } from 'projects/render-textarea/src/public_api';
import { RenderFileComponent } from 'projects/render-file/src/public_api';
import { RenderAComponent } from 'projects/render-a/src/public_api';
import { RenderCheckboxComponent } from 'projects/render-checkbox/src/public_api';
import { RenderRadioComponent } from 'projects/render-radio/src/public_api';
import { RenderRangeComponent } from 'projects/render-range/src/public_api';
import { RenderIframeComponent } from 'projects/render-iframe/src/public_api';
/*
import { RenderTemplateComponent } from 'projects/render-template/src/public_api';
*/


@Directive({
  selector: '[appRenderDynamicComp]'
})
export class DynamicCompDirective implements OnInit {

  @Input()
  public ctrl: ControlModel;

  public componentRef: any;
  public componentMap: any;

  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef
  ) {
    this.componentMap = {
      text: RenderInputsComponent,
      number: RenderInputsComponent,
      email: RenderInputsComponent,
      password: RenderInputsComponent,
      button: RenderButtonComponent,
      select: RenderSelectComponent,
      div: RenderDivMessageComponent,
      image: RenderImageComponent,
      textarea: RenderTextareaComponent,
      file: RenderFileComponent,
      a: RenderAComponent,
      checkbox: RenderCheckboxComponent,
      radio: RenderRadioComponent,
      range: RenderRangeComponent,
      iframe: RenderIframeComponent,
      /*
      template: RenderTemplateComponent
      */
    };
  }

  ngOnInit() {
    const factory = this.resolver.resolveComponentFactory(
      this.componentMap[this.ctrl.type]
    );
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.ctrl = this.ctrl;
  }

}

