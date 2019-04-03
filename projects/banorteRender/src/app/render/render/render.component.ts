import { Component, OnInit } from '@angular/core';
import { HttpCallService } from 'projects/http-call/src/public_api';
import { target } from '../../shared/data/port';
import { WindowModel } from '../../shared/models/window/window.model';
import { FormatStylesService } from '../../shared/services/format-styles/format-styles.service';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-render',
  templateUrl: './render.component.html',
  styleUrls: ['./render.component.css']
})
export class RenderComponent implements OnInit {
  windowId: string;
  window: WindowModel;

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpCallService,
    private formatStylesService: FormatStylesService
  ) {}

  ngOnInit() {
    this.getWindowId();
    this.getWindow();
  }

  getWindowId(): void {
    this.windowId = this.activatedRoute.snapshot.paramMap.get('windowId');
  }

  getWindow() {
    const url = `${target}/window/${this.windowId}`;
    this.http.getRequest(url, {}).subscribe((val: WindowModel) => {
      this.window = val;
      console.log('[this.window]: ', this.window);
    });
  }

  // De un 'string de estilos css' generará un objeto del tipo ngStyle
  setStylesOfWindow(window: WindowModel): { [key: string]: any } {
    const tamanio = `width:${window.width}px;height:${
      window.height
    }px;position:relative;`;
    const style: string = window.attributes['style'] + tamanio;
    const styleObj: {
      [key: string]: any;
    } = this.formatStylesService.stringToObj(style);

    return styleObj;
  }
}
