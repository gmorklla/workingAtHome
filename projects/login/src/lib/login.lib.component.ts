import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'lib-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginLibComponent implements OnInit {
  @Input()
  height: Observable<string>;
  @Input()
  user: Observable<any>;
  @Output()
  dataForLogin = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  login(e) {
    this.dataForLogin.emit(e);
  }
}
