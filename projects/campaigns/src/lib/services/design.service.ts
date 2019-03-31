import { Injectable } from '@angular/core';
import {Loadable} from '../components/loader/loadable.interface';
import {Design} from '../models/design.model';
import {Observable} from 'rxjs/Rx';
import {target} from '../../../../banorte/src/app/shared/data/port';
import {catchError, finalize} from 'rxjs/internal/operators';
import {HttpClient} from '@angular/common/http';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {throwError} from 'rxjs/index';

@Injectable()
export class DesignService implements Loadable {

  idLoader = 'loader-01';

  constructor(public http: HttpClient,
              private ngxService: NgxUiLoaderService) { }

  fn_create(): Observable<Design> {
    this.ngxService.startLoader(this.idLoader);

    return this.http.post<Design>(`${target}design`, new Design()).pipe(
      finalize(() => {
        this.ngxService.stopLoader(this.idLoader)
      }),
      catchError(err => throwError(err))
    );
  }
}
