import { Component, OnInit } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { map, tap, switchMap, catchError } from 'rxjs/operators';
import { HttpCallService } from 'projects/http-call/src/public_api';
import { SnackBarService } from '../../shared/services/snack-bar.service';
import { DataBusService } from '../../shared/services/data-bus.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  height: Observable<string>;
  user: Observable<any>;

  constructor(
    private http: HttpCallService,
    private snack: SnackBarService,
    private dataBus: DataBusService
  ) {}

  ngOnInit() {
    this.height = this.dataBus.contentHeight.pipe(map(height => `${height}px`));
  }

  // Function that handles the data passed from the login lib
  login(e) {}

  // Function that will call http request lib
  doRequest(endpoint, qData, hData): Observable<Object> {
    return this.http.postRequest(endpoint, qData, hData);
  }
}
