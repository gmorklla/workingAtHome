import { Injectable } from '@angular/core';
import {Day} from '../models/configuration/day.model';
import {Loadable} from '../components/loader/loadable.interface';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {Observable} from 'rxjs/Rx';
import {target} from '../../../../banorte/src/app/shared/data/port';
import {catchError, finalize} from 'rxjs/internal/operators';
import {throwError} from 'rxjs/index';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Configuration} from '../models/configuration.model';

@Injectable()
export class ConfigurationService implements Loadable {

  idLoader = 'loader-01';

  constructor(public http: HttpClient,
              private ngxService: NgxUiLoaderService) {
  }

  fn_getAllDays(): Observable<Day[]> {
    this.ngxService.startLoader(this.idLoader);
    return this.http.get<Day[]>(`${target}campaign/configuration/days`).pipe(
      finalize(() => {
        this.ngxService.stopLoader(this.idLoader)
      }),
      catchError(err => throwError(err))
    );
  }

  fn_get(idReferential: string, idChannel: string): Observable<Configuration> {
    this.ngxService.startLoader(this.idLoader);

    const params = new HttpParams()
      .set('id_referential', idReferential)
      .set('id_channel', idChannel);
    const url = `${target}campaign/configuration/get`;

    return this.http.get<Configuration>(url, {params}).pipe(
      finalize(() => {
        this.ngxService.stopLoader(this.idLoader)
      }),
      catchError(err => throwError(err))
    );
  }

  fn_saveOrUpdate(idReferential: string, idChannel: string, configuration: Configuration): Observable<boolean> {
    this.ngxService.startLoader(this.idLoader);
    const url = `${target}campaign/configuration/saveOrUpdate?id_referential=${idReferential}&id_channel=${idChannel}`;
    return this.http.post<boolean>(url, configuration).pipe(
      finalize(() => {
        this.ngxService.stopLoader(this.idLoader)
      }),
      catchError(err => throwError(err))
    );
  }
}
