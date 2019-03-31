import { Injectable } from '@angular/core';
import {Loadable} from '../components/loader/loadable.interface';
import {HttpClient} from '@angular/common/http';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {Observable} from 'rxjs/Rx';
import {LinkedChannelDesign} from '../models/linked.channel.design.model';
import {target} from '../../../../banorte/src/app/shared/data/port';
import {catchError, finalize} from 'rxjs/internal/operators';
import {throwError} from 'rxjs/index';

@Injectable()
export class LinkedChannelDesignService implements Loadable {

  idLoader = 'loader-01';

  constructor(public http: HttpClient,
              private ngxService: NgxUiLoaderService) { }

  fn_save(linkedChannelDesign: LinkedChannelDesign): Observable<LinkedChannelDesign> {
    this.ngxService.startLoader(this.idLoader);

    return this.http.post<LinkedChannelDesign>(`${target}campaign/linked-channel-design`, linkedChannelDesign).pipe(
      finalize(() => {
        this.ngxService.stopLoader(this.idLoader)
      }),
      catchError(err => throwError(err))
    );
  }
}
