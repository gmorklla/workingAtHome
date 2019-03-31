import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChildWindow } from '../models/child-window.model';
import { target } from 'projects/banorte/src/app/shared/data/port';
import { NewChildWindowModel } from '../models/new.child-window.model';

@Injectable({
  providedIn: 'root'
})
export class WindowService {
  private uri = `${target}window`;

  constructor(public http: HttpClient) {}

  createChildrenWindow(window: NewChildWindowModel, windowId: any) {
    console.log('[INI] createChildrenWindow');
    console.log(`${this.uri}/${windowId}/child`);
    console.log(window);
    console.log('[END] createChildrenWindow');
    return this.http
      .post<ChildWindow>(`${this.uri}/${windowId}/child`, window)
      .pipe();
  }
}
