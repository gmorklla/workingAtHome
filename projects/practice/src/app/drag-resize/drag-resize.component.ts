import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ViewContainerRef,
  ElementRef,
  ComponentFactoryResolver
} from '@angular/core';
import { ResizeEvent } from 'angular-resizable-element';

@Component({
  selector: 'app-drag-resize',
  templateUrl: './drag-resize.component.html',
  styleUrls: ['./drag-resize.component.css']
})
export class DragResizeComponent implements OnChanges, OnInit {
  public style: object = {};
  @Input() disableDrag = false;
  public top = '0';
  public left = '0';
  @ViewChild('container', { read: ViewContainerRef })
  container: ViewContainerRef;
  ele: HTMLElement;

  constructor(private resolver: ComponentFactoryResolver) {}

  ngOnInit() {
    this.ele = document.createElement('algo');
    this.ele.style.cssText =
      'position:absolute;width:100%;height:100%;border:1px solid #ddd;background:black;';
    this.container.element.nativeElement.appendChild(this.ele);
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('changes');
  }

  modifyEle() {
    this.ele.style.background = 'crimson';
  }

  validate(event: ResizeEvent): boolean {
    this.disableDrag = true;
    const MIN_DIMENSIONS_PX = 5;
    if (
      event.rectangle.width &&
      event.rectangle.height &&
      (event.rectangle.width < MIN_DIMENSIONS_PX ||
        event.rectangle.height < MIN_DIMENSIONS_PX)
    ) {
      return false;
    }
    return true;
  }

  onResizeEnd(event: ResizeEvent): void {
    this.style = {
      left: `${event.rectangle.left}px`,
      top: `${event.rectangle.top}px`,
      width: `${event.rectangle.width}px`,
      height: `${event.rectangle.height}px`
    };
  }

  dragEnded(e) {
    const trans3d = e.source.element.nativeElement.style.transform;
    const coords = trans3d
      .slice(trans3d.indexOf('(') + 1, -1)
      .replace(' ', '')
      .split(',')
      .slice(0, 2);
    this.top = coords[0];
    this.left = coords[1];
  }
}
