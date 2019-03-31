import { Component, OnInit } from '@angular/core';
import { HttpCallService } from 'projects/http-call/src/public_api';
import { DesignI } from '../../shared/data/data';
import { Router } from '@angular/router';
import { target } from '../../shared/data/port';

@Component({
  selector: 'app-flujo',
  templateUrl: './flujo.component.html',
  styleUrls: ['./flujo.component.css']
})
export class FlujoComponent implements OnInit {
  constructor(private http: HttpCallService, private router: Router) {}

  ngOnInit() {}

  crearVentana() {
    const url = `${target}design`;
    const obj = {
      id: 0,
      idWindow: 0
    };
    this.http.postRequest(url, obj, {}).subscribe((val: DesignI) => {
      this.router.navigate([
        `/layout/design/${val.id}/window/${val.initWindowId}`
      ]);
    });
  }
}
