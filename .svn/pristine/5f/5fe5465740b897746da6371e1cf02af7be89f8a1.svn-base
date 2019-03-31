import {
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
  ComponentRef,
  ComponentFactory,
  ViewChildren,
  AfterViewInit
} from '@angular/core';
import { DinamicoComponent } from './dinamico/dinamico.component';
import { Observable, from, of, empty, timer } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'practice';
  obs: Observable<any>;
  @ViewChild('din', { read: ViewContainerRef }) entry: ViewContainerRef;
  componentRef: ComponentRef<DinamicoComponent>;
  htmlEle = '<p>Paragraph</p>';
  arr = [{ transform: 'translate3d(200px, 10px, 0px)' }, 2, 3];
  yaHecho = false;
  trans = '';
  @ViewChildren('someName') someDivs;

  constructor(private resolver: ComponentFactoryResolver) {}

  ngOnInit() {
    // this.createObs();
    // this.createComponent({ msg: 'Nuevo componente' });
  }

  ngAfterViewInit() {
    // or some event handler
    // this.someDivs.toArray()[0].nativeElement.classList.add('isActive');
    const arr = this.someDivs.toArray();
    arr.forEach(element => {
      const ele = element as HTMLElement;
      console.log(ele);
      ele['nativeElement'].style.transform = 'translate(200px, 10px)';
    });
    // console.log(this.someDivs.toArray()[0].nativeElement);
  }

  getTransform() {
    const valueF = `translate3d(200px, 10px, 0px)`;
    this.yaHecho = true;
    return valueF;
  }

  setTrans(i) {
    const element = document.getElementById(i) as HTMLElement;
    if (element && !this.yaHecho) {
      element.style.transform = 'translate3d(200px, 10px, 0px)';
      this.yaHecho = true;
    }
    console.log(element);
    console.log('setTrans');
  }

  createObs() {
    this.obs = Observable.create(observer => {
      const arr = Array(2);
      const mapped = Array.from(arr, (val, idx) => {
        return { idx: idx, value: idx + 1 };
      });
      observer.next(mapped);
    });
  }

  createComponent(obj) {
    this.entry.clear();
    const factory = this.resolver.resolveComponentFactory(DinamicoComponent);
    this.componentRef = this.entry.createComponent(factory);
    this.componentRef.instance.ctx = obj;
  }
}
