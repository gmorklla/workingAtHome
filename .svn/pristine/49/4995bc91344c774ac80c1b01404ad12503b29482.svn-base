import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, tap, filter } from 'rxjs/operators';

@Component({
  selector: 'lib-message-input',
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.css']
})
export class MessageInputComponent implements OnInit {
  message = new FormControl('');
  typing = false;
  @Output() emitTypingEvent = new EventEmitter<any>();
  @Output() emitMessage = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {
    // Typing...
    this.message.valueChanges
      .pipe(
        filter(val => val !== ''),
        tap(() => {
          if (!this.typing) {
            this.emitTypingEvent.emit('typing');
            // this.chat.sendData('typing', '');
            this.typing = true;
          }
        }),
        debounceTime(1000)
      )
      .subscribe(() => {
        this.emitTypingEvent.emit('stop typing');
        // this.chat.sendData('stop typing', '');
        this.typing = false;
      });
  }

  sendMessage() {
    const txt = this.message.value;
    this.emitMessage.emit(txt);
    this.message.setValue('');
  }
}
