import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver
} from '@angular/core';
import { tap } from 'rxjs/operators';
import { ControlesI } from '../../../../shared/data/data';
import { FormImageComponentComponent } from 'projects/image-component/src/public_api';
import { EventEmitterService } from '../../../../shared/services/event-emitter.service';

@Component({
  selector: 'app-container-styles',
  templateUrl: './container-styles.component.html',
  styleUrls: ['./container-styles.component.css']
})
export class ContainerStylesComponent implements OnInit, OnChanges {
  @Input() ctrlSelected: ControlesI;
  @Output() emitChangeFromForm = new EventEmitter();
  @Output() destroyControl = new EventEmitter();
  @ViewChild('container', { read: ViewContainerRef })
  container: ViewContainerRef;

  constructor(
    private resolver: ComponentFactoryResolver,
    private emitterS: EventEmitterService
  ) {}

  ngOnInit() {
    this.createComponent();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.ctrlSelected) {
      this.createComponent();
    }
  }

  createComponent() {
    if (this.ctrlSelected.type === 'image') {
      const component = FormImageComponentComponent;
      this.container.clear();
      const factory = this.resolver.resolveComponentFactory(component);
      const componentRef = this.container.createComponent(factory);
      componentRef.instance['control'] = this.ctrlSelected;
      componentRef.instance['propChange']
        .pipe(tap(val => this.propChangeToEmit(val)))
        .subscribe(_ => {});
    } else {
      this.container.clear();
    }
  }

  propChangeToEmit(e) {
    this.emitterS.dispatchEvent({
      control: this.ctrlSelected,
      data: e
    });
  }
}
