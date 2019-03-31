import { Component, OnInit } from '@angular/core';
import { SnackBarService } from '../../shared/services/snack-bar.service';
import { DataBusService } from '../../shared/services/data-bus.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  height: Observable<string>;

  constructor(
    private snack: SnackBarService,
    private dataBus: DataBusService
  ) {}

  ngOnInit() {
    this.height = this.dataBus.contentHeight.pipe(
      map(height => `${height - 214}px`)
    );
  }

  logData(e) {
    this.snack.open(e.txt, 'Ok');
  }
}
