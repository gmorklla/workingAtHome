import { Component, OnInit, Input } from '@angular/core';
import { EventEmitterService } from 'projects/banorte/src/app/shared/services/event-emitter.service';

@Component({
  selector: 'app-fondo',
  templateUrl: './fondo.component.html',
  styleUrls: ['./fondo.component.css']
})
export class FondoComponent implements OnInit {
  @Input() ctrlSelected;

  constructor(private emitterS: EventEmitterService) {}

  ngOnInit() {}

  public getCss(e: { background: string }) {
    this.emitterS.dispatchStyle({ background: e.background.trim() });
    // this.emitterS.windowStyles$.next(css);
  }
}
