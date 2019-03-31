import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  distinctUntilChanged,
  debounceTime,
  map,
  filter
} from 'rxjs/operators';

@Component({
  selector: 'lib-nickname-setter',
  templateUrl: './nickname-setter.component.html',
  styleUrls: ['./nickname-setter.component.css']
})
export class NicknameSetterComponent implements OnInit {
  nickname = new FormControl('');
  @Output() nick = new EventEmitter<string>();
  readOnly = false;

  constructor() {}

  ngOnInit() {
    // Set nickname
    this.nickname.valueChanges
      .pipe(
        map(inputVal => inputVal.trim()),
        distinctUntilChanged(),
        debounceTime(1000),
        filter(nick => {
          const confirmName = confirm(
            'Do you want to use "' + nick + '" as nickname?'
          );
          if (confirmName) {
            this.readOnly = true;
            return nick;
          }
        })
      )
      .subscribe(nickname => this.nick.emit(nickname));
  }
}
