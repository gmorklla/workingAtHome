import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'lib-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  @Input() users: Array<any>;

  constructor() {}

  ngOnInit() {}
}
