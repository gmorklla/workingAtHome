import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import {DataSource} from '../../../models/service/dataSource/data-source.model';
import {targetModels} from '../../../../shared/data/port';
import {catchError, finalize} from 'rxjs/internal/operators';
import {throwError} from 'rxjs/index';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {Loadable} from '../../../../../../../campaigns/src/lib/components/loader/loadable.interface';

@Injectable()
export class DataSourceService implements Loadable {

  idLoader = 'loader-01';

  constructor(public http: HttpClient,
              private ngxService: NgxUiLoaderService) { }

  fn_get(dataSourceId: number): Observable<DataSource> {
    // this.ngxService.startLoader(this.idLoader);

    const url = `${targetModels}fuente-datos/get/${dataSourceId}`;
    return this.http.get<DataSource>(url).pipe(
      finalize(() => {
        // this.ngxService.stopLoader(this.idLoader)
      }),
      catchError(err => throwError(err))
    );
  }

  fn_getAll(): Observable<DataSource[]> {
    // this.ngxService.startLoader(this.idLoader);

    const url = `${targetModels}fuente-datos/filter?estatus=A&tipo=1`;
    return this.http.get<DataSource[]>(url).pipe(
      finalize(() => {
        // this.ngxService.stopLoader(this.idLoader) // TODO: Problemas con el spinner
      }),
      catchError(err => throwError(err))
    );
  }
}
