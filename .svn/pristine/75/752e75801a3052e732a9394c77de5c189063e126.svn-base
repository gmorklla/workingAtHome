import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Campaign} from '../models/campaign.model';
import {target} from '../../../../banorte/src/app/shared/data/port';
import {Observable, throwError} from 'rxjs/index';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {catchError, finalize, tap} from 'rxjs/internal/operators';
import {Loadable} from '../components/loader/loadable.interface';

@Injectable()
export class CampaignService implements Loadable {

  idLoader = 'loader-01';

  constructor(public http: HttpClient,
              private ngxService: NgxUiLoaderService) { }

  fn_pageAll(search: string,
             campaignCode: string,
             offerCode: string,
             idChannel: string,
             status: string,
             page: number,
             pageSize: number): Observable<Campaign[]> {
    this.ngxService.startLoader(this.idLoader);
    const url = `${target}campaign/pageAll?search=${search}&campaign_code=${campaignCode}&offer_code=${offerCode}&id_channel=${idChannel}&status=${status}&page=${page}&page_size=${pageSize}`;
    return this.http.get<Campaign[]>(url).pipe(
      finalize(() => {
        this.ngxService.stopLoader(this.idLoader)
      }),
      catchError(err => throwError(err))
    );
  }

  fn_pageCount(search: string,
               campaignCode: string,
               offerCode: string,
               idChannel: string,
               status: string): Observable<number> {
    this.ngxService.startLoader(this.idLoader);
    const url = `${target}campaign/pageCount?search=${search}&campaign_code=${campaignCode}&offer_code=${offerCode}&id_channel=${idChannel}&status=${status}`;
    return this.http.get<number>(url).pipe(
      finalize(() => {
        this.ngxService.stopLoader(this.idLoader)
      }),
      catchError(err => throwError(err))
    );
  }
}
