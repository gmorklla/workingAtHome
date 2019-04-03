import {
  Directive,
  Input,
  ComponentFactoryResolver,
  ViewContainerRef,
  OnInit,
  EventEmitter
} from '@angular/core';
import { ControlesI } from '../data/data';
import { InputGeneralComponent } from 'projects/input-general/src/public_api';
import { InputButtonComponent } from 'projects/input-button/src/public_api';
import { SelectLibComponent } from 'projects/select-lib/src/public_api';
import { DivMessageComponent } from 'projects/div-message/src/public_api';
import { ImageComponentComponent } from 'projects/image-component/src/public_api';
import { TextareaComponent } from 'projects/textarea/src/public_api';
import { InputFileComponent } from 'projects/input-file/src/public_api';
import { LinkComponent } from 'projects/link/src/public_api';
import { InputCheckboxComponent } from 'projects/input-checkbox/src/public_api';
import { InputRadioComponent } from 'projects/input-radio/src/public_api';
import { InputRangeComponent } from 'projects/input-range/src/public_api';
import { IframeComponent } from 'projects/iframe/src/public_api';
import { TemplatePlaceholderComponent } from '../../editor/editor/dinamico/dinamico.component';
import { EventEmitterService } from '../services/event-emitter.service';

@Directive({
  selector: '[appDynamicComp]'
})
export class DynamicCompDirective implements OnInit {
  @Input() ctrl: ControlesI;
  componentRef: any;
  componentMap = {
    text: InputGeneralComponent,
    number: InputGeneralComponent,
    email: InputGeneralComponent,
    password: InputGeneralComponent,
    button: InputButtonComponent,
    select: SelectLibComponent,
    div: DivMessageComponent,
    image: ImageComponentComponent,
    textarea: TextareaComponent,
    file: InputFileComponent,
    a: LinkComponent,
    checkbox: InputCheckboxComponent,
    radio: InputRadioComponent,
    range: InputRangeComponent,
    iframe: IframeComponent,
    template: TemplatePlaceholderComponent
  };

  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef,
    private emitterS: EventEmitterService
  ) {}

  ngOnInit() {
    const factory = this.resolver.resolveComponentFactory(
      this.componentMap[this.ctrl.type]
    );
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.ctrl = this.ctrl;
    // resize start event
    this.componentRef.instance['rzStartE'].subscribe((val: ControlesI) =>
      this.emitterS.rzStartE.next(val)
    );
    // resize stop event
    this.componentRef.instance['rzStopE'].subscribe(
      (size: { width: number; height: number }) =>
        this.emitterS.dispatchStyle({
          width: `${size.width}px`,
          height: `${size.height}px`
        })
    );
    // drag end event
    this.componentRef.instance['dragEndE'].subscribe((transform: string) =>
      this.emitterS.dispatchStyle({
        transform: transform
      })
    );
  }
}
