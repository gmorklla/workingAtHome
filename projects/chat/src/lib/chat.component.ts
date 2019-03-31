import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SocketCommService } from 'projects/socket-comm/src/public_api';
import { Observable } from 'rxjs';

@Component({
  selector: 'lib-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [SocketCommService]
})
export class ChatComponent implements OnInit {
  messages = [];
  nickname = '';
  users = [];
  typingMsg = '';
  @Output() logData = new EventEmitter<any>();
  @Input() height: Observable<string>;

  constructor(private chat: SocketCommService) {}

  ngOnInit() {
    // Connect to socket
    this.chat.connect('http://localhost:3000');
    // On socket message
    this.chat.onData('message').subscribe(message => this.pushMessage(message));
    // On users
    this.chat.onData('users').subscribe(users => (this.users = users));
    // On new user join conversation
    this.chat.onData('newUser').subscribe(data => {
      const str = data.username + ' joined the conversation';
      this.logData.emit({ txt: str });
    });
    // On typing...
    this.chat.onData('typing').subscribe(data => {
      const user = data.username ? data.username : 'Somebody';
      const str = user + ' is typing...';
      this.typingMsg = str;
    });
    // On stop typing...
    this.chat.onData('stop typing').subscribe(() => (this.typingMsg = ''));
  }

  setNick(e) {
    this.nickname = e;
    this.chat.sendData('add user', e);
  }

  emitTypingEvent(e) {
    this.chat.sendData(e, '');
  }

  sendMessage(e) {
    this.pushMessage({ username: this.nickname, txt: e });
    this.chat.sendData('message', e);
  }

  pushMessage(obj: { username: string; txt: string }) {
    const clone = this.messages.slice();
    clone.unshift({ username: obj.username, txt: obj.txt });
    this.messages = clone;
  }
}
