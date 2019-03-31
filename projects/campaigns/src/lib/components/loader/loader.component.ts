import { Component, OnInit } from '@angular/core';
import {POSITION, SPINNER} from 'ngx-ui-loader';

@Component({
  selector: 'lib-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  public POSITION = POSITION;
  public SPINNER = SPINNER;

  constructor() { }

  ngOnInit() {
  }

}
