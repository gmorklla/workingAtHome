import { Injectable } from '@angular/core';
import {target} from '../../../../banorte/src/app/shared/data/port';
import {Observable, throwError} from 'rxjs/index';
import {HttpClient} from '@angular/common/http';
import {Channel} from '../models/channel.model';
import {catchError, finalize, tap} from 'rxjs/internal/operators';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {Loadable} from '../components/loader/loadable.interface';

@Injectable()
export class ChannelService implements Loadable {

  idLoader = 'loader-01';

  constructor(public http: HttpClient,
              private ngxService: NgxUiLoaderService) { }

  fn_getAll(): Observable<Channel[]> {
    this.ngxService.startLoader(this.idLoader);
    return this.http.get<Channel[]>(`${target}campaign/channel`).pipe(
      finalize(() => {
        this.ngxService.stopLoader(this.idLoader)
      }),
      catchError(err => throwError(err))
    );
  }

  fn_getAllByItem(parameter:string): Observable<Channel[]> {
    console.log('Si pasa 2 '+parameter);
    this.ngxService.startLoader(this.idLoader);
    return this.http.get<Channel[]>(`${target}campaign/channel/name/${parameter}`).pipe(
      finalize(() => {
        this.ngxService.stopLoader(this.idLoader)
      }),
      catchError(err => throwError(err))
    );
  }
}
