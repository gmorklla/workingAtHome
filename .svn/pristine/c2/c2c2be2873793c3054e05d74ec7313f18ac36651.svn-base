import {Injectable} from '@angular/core';
import {Loadable} from '../../../../campaigns/src/lib/components/loader/loadable.interface';
import {HttpClient, HttpParams} from '@angular/common/http';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {Observable} from 'rxjs/Rx';
import {target} from '../../../../banorte/src/app/shared/data/port';
import {catchError, finalize} from 'rxjs/internal/operators';
import {Flow} from '../models/flow.model';
import {throwError} from 'rxjs/index';

@Injectable()
export class FlowService implements Loadable {

  idLoader = 'loader-01';

  constructor(public http: HttpClient,
              private ngxService: NgxUiLoaderService) {
  }

  fn_get(id: string): Observable<Flow> {
    this.ngxService.startLoader(this.idLoader);

    return this.http.get<Flow>(`${target}flow/${id}`).pipe(
      finalize(() => {
        this.ngxService.stopLoader(this.idLoader)
      }),
      catchError(err => throwError(err))
    );
  }

  fn_update(flow: Flow): Observable<Flow> {
    this.ngxService.startLoader(this.idLoader);

    return this.http.put<Flow>(`${target}flow`, flow).pipe(
      finalize(() => {
        this.ngxService.stopLoader(this.idLoader)
      }),
      catchError(err => throwError(err))
    );
  }

  fn_save(flow: Flow): Observable<Flow> {
    this.ngxService.startLoader(this.idLoader);

    return this.http.post<Flow>(`${target}flow`, flow).pipe(
      finalize(() => {
        this.ngxService.stopLoader(this.idLoader)
      }),
      catchError(err => throwError(err))
    );
  }

  fn_pageAll(search: string, idChannel: string, status: string, page: number, pageSize: number): Observable<Flow[]> {
    this.ngxService.startLoader(this.idLoader);

    const params = new HttpParams()
      .set('search', search)
      .set('id_channel', idChannel)
      .set('status', status)
      .set('page', String(page))
      .set('page_size', String(pageSize));

    return this.http.get<Flow[]>(`${target}flow/pageAll`, {params}).pipe(
      finalize(() => {
        this.ngxService.stopLoader(this.idLoader)
      }),
      catchError(err => throwError(err))
    );
  }

  fn_pageCount(search: string, idChannel: string, status: string): Observable<number> {
    this.ngxService.startLoader(this.idLoader);

    const params = new HttpParams()
      .set('search', search)
      .set('id_channel', idChannel)
      .set('status', status);

    return this.http.get<number>(`${target}flow/pageCount`, {params}).pipe(
      finalize(() => {
        this.ngxService.stopLoader(this.idLoader)
      }),
      catchError(err => throwError(err))
    );
  }
}
