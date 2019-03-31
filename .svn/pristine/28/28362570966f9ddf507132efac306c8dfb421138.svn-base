import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataBusService {
  contentHeight: Observable<number>;
  submenuE$ = new Subject<any>();
  saveDash$ = new Subject<any>();

  constructor() {}

  setContentHeight(height: number) {
    this.contentHeight = of(height);
  }

  submenuEvent(e: string) {
    switch (e) {
      case 'Save':
        this.saveDash$.next(1);
        break;
      default:
        this.submenuE$.next(e);
        break;
    }
  }
}
