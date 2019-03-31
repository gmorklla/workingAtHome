import {
  Component,
  ComponentFactoryResolver,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { WindowI } from '../../../../shared/data/data';
import { EventEmitterService } from '../../../../shared/services/event-emitter.service';
import { tap } from 'rxjs/operators';
import { FormWindowEditComponent } from 'projects/window-edit/src/public_api';

@Component({
  selector: 'app-container-styles-win',
  templateUrl: './container-styles-win.component.html',
  styleUrls: ['./container-styles-win.component.css']
})
export class ContainerStylesWinComponent implements OnInit, OnChanges {
  @Input() public windowSelected: WindowI;
  @Output() emitChangeFromForm = new EventEmitter();

  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;

  constructor(
    private resolver: ComponentFactoryResolver,
    private emitterS: EventEmitterService
  ) {}

  ngOnInit() {
    this.createComponent();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.windowSelected) {
      this.createComponent();
    }
  }

  createComponent() {
    let component;
    component = FormWindowEditComponent;
    this.container.clear();
    const factory = this.resolver.resolveComponentFactory(
      FormWindowEditComponent
    );
    const componentRef = this.container.createComponent(factory);
    componentRef.instance['window'] = this.windowSelected;
    componentRef.instance['propChange']
      .pipe(tap(val => this.propChangeToEmit(val)))
      .subscribe(_ => {});
  }

  propChangeToEmit(e) {
    this.emitterS.dispatchEvent({
      window: this.windowSelected,
      data: e.windowValue ? e.windowValue : e
    });
  }
}
