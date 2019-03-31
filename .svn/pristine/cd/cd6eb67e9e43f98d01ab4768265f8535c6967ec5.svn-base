import { Component, OnInit } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { map, tap, switchMap, catchError } from 'rxjs/operators';
import { HttpCallService } from 'projects/http-call/src/public_api';
import { AuthService } from '../../shared/services/auth.service';
import { DataBusService } from '../../shared/services/data-bus.service';
import { SnackBarService } from '../../shared/services/snack-bar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  height: Observable<string>;
  user: Observable<any>;

  constructor(
    private dataBus: DataBusService,
    private http: HttpCallService,
    private auth: AuthService,
    private snack: SnackBarService
  ) {
    this.auth.user$
      .pipe(
        tap(val => {
          this.user = val ? of(val) : of(null);
        })
      )
      .subscribe(_ => {});
  }

  ngOnInit() {
    this.height = this.dataBus.contentHeight.pipe(map(height => `${height}px`));
    this.auth.getUser();
  }
  // Function that handles the data passed from the login lib
  login(e) {
    let endpoint = '';
    let qData = {};
    const hData = { 'Content-Type': 'application/x-www-form-urlencoded' };
    // Handle login different cases
    switch (e.type) {
      // Login case
      case 'login':
        // Specific data for http request
        endpoint = 'http://localhost:3000/login';
        qData = { email: e.email, password: e.password };
        // Http request call
        this.doRequest(endpoint, qData, hData)
          .pipe(
            switchMap(res => this.auth.setSession(res['token'])),
            catchError(err => {
              if (err.status === 401) {
                this.snack.open(
                  'Something is wrong with your credentials',
                  'Ok'
                );
              }
              return throwError(err);
            })
          )
          .subscribe(_ => this.snack.open('Welcome!', 'Ok'));
        break;
      // Signup case
      case 'signup':
        endpoint = 'http://localhost:3000/signup';
        qData = { email: e.email, password: e.password };
        this.doRequest(endpoint, qData, hData)
          .pipe(switchMap(res => this.auth.setSession(res['token'])))
          .subscribe(_ => this.snack.open('Welcome!', 'Ok'));
        break;
      case 'logout':
        this.auth.logout();
        break;
      case 'reset':
        console.log('reset', e);
        break;
      default:
        break;
    }
  }
  // Function that will call http request lib
  doRequest(endpoint, qData, hData): Observable<Object> {
    return this.http.postRequest(endpoint, qData, hData);
  }
}
