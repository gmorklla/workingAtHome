import { Injectable } from '@angular/core';
import {Loadable} from '../../../../../../campaigns/src/lib/components/loader/loadable.interface';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import {Variable} from '../../models/variable/variable.model';
import {targetRules} from '../../../shared/data/port';
import {catchError, finalize} from 'rxjs/internal/operators';
import {throwError} from 'rxjs/index';

@Injectable()
export class VariableService implements Loadable {

  idLoader = 'loader-01';

  constructor(public http: HttpClient,
              private ngxService: NgxUiLoaderService) { }

  fn_search(search: string): Observable<Variable[]> {
    this.ngxService.startLoader(this.idLoader);

    const url = `${targetRules}variable/catalog?name=${search}`;
    return this.http.get<Variable[]>(url).pipe(
      finalize(() => {
        this.ngxService.stopLoader(this.idLoader)
      }),
      catchError(err => throwError(err))
    );
  }
}
