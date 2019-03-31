import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dinamico',
  templateUrl: './dinamico.component.html',
  styleUrls: ['./dinamico.component.css']
})
export class DinamicoComponent implements OnInit {
  @Input() ctx;

  constructor() {}

  ngOnInit() {
    console.log(this.ctx);
  }
}
