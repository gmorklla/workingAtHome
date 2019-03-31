import {
  Component,
  ElementRef,
  ViewChild,
  OnInit,
  HostListener
} from '@angular/core';
import { DataBusService } from './shared/services/data-bus.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'banorte';
  @ViewChild('container')
  container: ElementRef;

  constructor(private dataBus: DataBusService) {}

  ngOnInit() {
    this.dataBus.setContentHeight(
      this.container.nativeElement.clientHeight - 138
    );
  }
}
