import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import {DataSource} from '../../../models/service/dataSource/data-source.model';
import {targetModels} from '../../../../shared/data/port';
import {catchError, finalize} from 'rxjs/internal/operators';
import {throwError} from 'rxjs/index';

@Injectable()
export class DataSourceService {

  constructor(public http: HttpClient) { }

  fn_get(dataSourceId: number): Observable<DataSource> {
    const url = `${targetModels}fuente-datos/get/${dataSourceId}`;
    return this.http.get<DataSource>(url).pipe(
      finalize(() => {
        // this.ngxService.stopLoader(this.idLoader)
      }),
      catchError(err => throwError(err))
    );
  }
}
