import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { EventEmitterService } from 'projects/banorte/src/app/shared/services/event-emitter.service';

@Component({
  selector: 'app-window-form',
  templateUrl: './window-form.component.html',
  styleUrls: ['./window-form.component.css']
})
export class WindowFormComponent implements OnInit, OnChanges {
  @Input() control;

  constructor(private emitterS: EventEmitterService) {}

  public ngOnInit() {
    console.log('window control', this.control);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.control) {
    }
  }

  public getCss(e: { background: string }) {
    const css = `background:${e.background.trim()};`;
    this.emitterS.windowStyles$.next(css);
  }
}
