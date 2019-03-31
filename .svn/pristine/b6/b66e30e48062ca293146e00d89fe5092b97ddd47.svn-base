import {
  Component,
  ComponentFactoryResolver,
  Injector,
  Input,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { DashboardCard } from '../dashboard-card';

@Component({
  selector: 'app-card-spawner',
  template: `
    <div #spawn></div>`,
  styles: [':host { height: 100%; width: 100%;}']
})
export class CardSpawnerComponent {
  @ViewChild('spawn', { read: ViewContainerRef })
  container;

  constructor(private resolver: ComponentFactoryResolver) {}

  @Input()
  set card(data: DashboardCard) {
    if (!data) {
      return;
    }
    const inputProviders = Object.keys(data.input).map(inputName => {
      return {
        provide: data.input[inputName].key,
        useValue: data.input[inputName].value,
        deps: []
      };
    });
    const injector = Injector.create(
      inputProviders,
      this.container.parentInjector
    );
    const factory = this.resolver.resolveComponentFactory(data.component);
    const component = factory.create(injector);
    this.container.insert(component.hostView);
  }
}
