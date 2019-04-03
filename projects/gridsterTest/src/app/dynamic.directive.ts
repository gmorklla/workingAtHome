import {
  Directive,
  ComponentFactoryResolver,
  ViewContainerRef,
  OnInit
} from '@angular/core';
import { InputGComponent } from './input-g/input-g.component';
import { window } from './staticData';

@Directive({
  selector: '[appDynamic]'
})
export class DynamicDirective implements OnInit {
  ctrl = window.controls[0];
  componentRef: any;
  componentMap = {
    text: InputGComponent
  };

  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef
  ) {}

  ngOnInit() {
    const factory = this.resolver.resolveComponentFactory(
      this.componentMap[this.ctrl.type]
    );
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.ctrl = this.ctrl;
  }
}
