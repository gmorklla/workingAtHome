import { Injectable } from '@angular/core';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {HttpClient} from '@angular/common/http';
import {DataType} from '../../models/variable/data-type.model';
import {catchError, finalize} from 'rxjs/internal/operators';
import {throwError} from 'rxjs/index';
import {Observable} from 'rxjs/Rx';
import {Loadable} from '../../../../../../campaigns/src/lib/components/loader/loadable.interface';
import {targetRules} from '../../../shared/data/port';

@Injectable()
export class DataTypeService implements Loadable {

  idLoader = 'loader-01';

  constructor(public http: HttpClient,
              private ngxService: NgxUiLoaderService) { }

  fn_getAll(): Observable<DataType[]> {
    this.ngxService.startLoader(this.idLoader);

    const url = `${targetRules}data-types`;
    return this.http.get<DataType[]>(url).pipe(
      finalize(() => {
        this.ngxService.stopLoader(this.idLoader)
      }),
      catchError(err => throwError(err))
    );

    /*const listDataType: DataType[] = Array.from({length: 1}, (_, k) => createNewDataType(k + 1));

    const observable = new Observable<DataType[]>(observer => {
      setTimeout(() => {
        observer.next(listDataType);
      }, 1000);
    });

    return observable;*/
  }
}

function createNewDataType(i: number): DataType {
  const dataType = new DataType();
  dataType.id = i;
  dataType.name = 'Texto';

  return dataType;
}

