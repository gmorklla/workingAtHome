import { Injectable } from '@angular/core';
import {Loadable} from '../../../../../../campaigns/src/lib/components/loader/loadable.interface';
import {ServiceDesign} from '../../models/service/service-design.model';
import {HttpClient} from '@angular/common/http';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {Observable} from 'rxjs/Rx';
import {targetRules} from '../../../shared/data/port';
import {catchError, finalize} from 'rxjs/internal/operators';
import {throwError} from 'rxjs/index';
import {DataSourceService} from './dataSource/data-source.service';
import {AlertService} from '../../../../../../campaigns/src/lib/services/alert/alert.service';

@Injectable()
export class ServiceDesignService implements Loadable {

  idLoader = 'loader-01';

  private listServiceDesign: ServiceDesign[];
  private idSeq = 0;

  constructor(private dataSourceService: DataSourceService,
              private http: HttpClient,
              private ngxService: NgxUiLoaderService,
              private alertService: AlertService) {
    this.listServiceDesign = Array.from({length: this.idSeq}, (_, k) => createNewServiceDesign(k + 1, 800));
  }

  fn_getAll(designId: number): Observable<ServiceDesign[]> {
    this.ngxService.startLoader(this.idLoader);

    const url = `${targetRules}service/design/${designId}`;
    return this.http.get<ServiceDesign[]>(url).pipe(
      finalize(() => {
        this.ngxService.stopLoader(this.idLoader)
      }),
      catchError(err => throwError(err))
    );

    /*this.listServiceDesign.forEach((_serviceDesign) => {
      this.dataSourceService.fn_get(_serviceDesign.dataSourceId).subscribe({
        next: (result: DataSource) => {
          console.log('[RESPONSE]', result);
          _serviceDesign.dataSource = result;
        },
        error: (error: any) => {
          console.log(error);
          this.alertService.fn_error(Messages.MSG014_RULE_DATA_SOURCE_GET_ALL_ERROR);
        },
        complete: () => {
          console.log('OK');
        }
      });
    });

    const observable = new Observable<ServiceDesign[]>(observer => {
      setTimeout(() => {
        observer.next(this.listServiceDesign.slice(0));
      }, 1000);
    });

    return observable;*/
  }

  fn_get(idServiceDesign: number): Observable<ServiceDesign> {
    this.ngxService.startLoader(this.idLoader);

    const url = `${targetRules}service/${idServiceDesign}`;
    return this.http.get<ServiceDesign>(url).pipe(
      finalize(() => {
        this.ngxService.stopLoader(this.idLoader)
      }),
      catchError(err => throwError(err))
    );
  }

  fn_save(serviceDesign: ServiceDesign): Observable<ServiceDesign> {
    this.ngxService.startLoader(this.idLoader);

    const url = `${targetRules}service`;
    return this.http.post<ServiceDesign>(url, serviceDesign).pipe(
      finalize(() => {
        this.ngxService.stopLoader(this.idLoader)
      }),
      catchError(err => throwError(err))
    );

    /*this.idSeq = this.idSeq + 1;
    serviceDesign.id = this.idSeq;

    this.listServiceDesign.unshift(serviceDesign);

    const observable = new Observable<ServiceDesign>(observer => {
      setTimeout(() => {
        observer.next(serviceDesign);
      }, 1000);
    });

    return observable;*/
  }

  fn_update(serviceDesign: ServiceDesign): Observable<ServiceDesign> {
    this.ngxService.startLoader(this.idLoader);

    const url = `${targetRules}service`;
    return this.http.put<ServiceDesign>(url, serviceDesign).pipe(
      finalize(() => {
        this.ngxService.stopLoader(this.idLoader)
      }),
      catchError(err => throwError(err))
    );

    /*this.listServiceDesign.forEach((_serviceDesign, index) => {
      if (_serviceDesign.id === serviceDesign.id) {
        this.listServiceDesign[index] = serviceDesign;

        return false;
      }
    });

    const observable = new Observable<ServiceDesign>(observer => {
      setTimeout(() => {
        observer.next(serviceDesign);
      }, 1000);
    });

    return observable;*/
  }

  fn_delete(serviceDesign: ServiceDesign): Observable<boolean> {
    this.ngxService.startLoader(this.idLoader);

    const url = `${targetRules}service/${serviceDesign.id}`;
    return this.http.delete<boolean>(url).pipe(
      finalize(() => {
        this.ngxService.stopLoader(this.idLoader)
      }),
      catchError(err => throwError(err))
    );

    /*let _delete = false;
    this.listServiceDesign.forEach((_serviceDesign, index) => {
      if (_serviceDesign.id === serviceDesign.id) {
        this.listServiceDesign.splice(index, 1);
        _delete = true;

        return false;
      }
    });

    const observable = new Observable<boolean>(observer => {
      setTimeout(() => {
        observer.next(_delete);
      }, 1000);
    });

    return observable;*/
  }
}

function createNewServiceDesign(i: number, designId: number): ServiceDesign {
  const serviceDesign = new ServiceDesign();
  serviceDesign.id = i;
  serviceDesign.designId = designId;
  serviceDesign.dataSourceId = 179;
  serviceDesign.description = 'Description ' + i;
  serviceDesign.fields = [];
  serviceDesign.creationDate = new Date();
  serviceDesign.updateDate = new Date();

  return serviceDesign;
}
