import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'lib-typing-msg',
  templateUrl: './typing-msg.component.html',
  styleUrls: ['./typing-msg.component.css']
})
export class TypingMsgComponent implements OnInit {
  @Input() typingMsg;

  constructor() {}

  ngOnInit() {}
}
