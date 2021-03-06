import { Injectable } from '@angular/core';
import {Loadable} from '../../../../../../campaigns/src/lib/components/loader/loadable.interface';
import {HttpClient} from '@angular/common/http';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {Observable} from 'rxjs/Rx';
import {VariableDesign} from '../../models/variable/variable-design.model';
import {targetRules} from '../../../shared/data/port';
import {catchError, finalize} from 'rxjs/internal/operators';
import {throwError} from 'rxjs/index';
import {Variable} from '../../models/variable/variable.model';
import {DataType} from '../../models/variable/data-type.model';

@Injectable()
export class VariableDesignService implements Loadable {

  idLoader = 'loader-01';

  private listVariableDesign: VariableDesign[]; // TODO: YDM - Quitar
  private idSeq = 100;

  constructor(public http: HttpClient,
              private ngxService: NgxUiLoaderService) {
    this.listVariableDesign = Array.from({length: this.idSeq}, (_, k) => createNewVariableDesign(k + 1, 800));
  }

  fn_getAll(designId: number): Observable<VariableDesign[]> {
    this.ngxService.startLoader(this.idLoader);

    const url = `${targetRules}variable/design/${designId}`;
    return this.http.get<VariableDesign[]>(url).pipe(
      finalize(() => {
        this.ngxService.stopLoader(this.idLoader)
      }),
      catchError(err => throwError(err))
    );

    /*const observable = new Observable<VariableDesign[]>(observer => {
      setTimeout(() => {
        observer.next(this.listVariableDesign);
      }, 1000);
    });

    return observable;*/
  }

  fn_save(variableDesign: VariableDesign): Observable<VariableDesign> {
    this.ngxService.startLoader(this.idLoader);

    const url = `${targetRules}variable`;
    return this.http.post<VariableDesign>(url, variableDesign).pipe(
      finalize(() => {
        this.ngxService.stopLoader(this.idLoader)
      }),
      catchError(err => throwError(err))
    );

    /*this.idSeq = this.idSeq + 1;
    variableDesign.id = this.idSeq;

    this.listVariableDesign.unshift(variableDesign);

    const observable = new Observable<VariableDesign>(observer => {
      setTimeout(() => {
        observer.next(variableDesign);
      }, 1000);
    });

    return observable;*/
  }

  // @Deprecated
  fn_update(variableDesign: VariableDesign): Observable<VariableDesign> {
    /*this.ngxService.startLoader(this.idLoader);

    const url = `${target}rule/variable/variableDesign`;
    return this.http.put<VariableDesign>(url, variableDesign).pipe(
      finalize(() => {
        this.ngxService.stopLoader(this.idLoader)
      }),
      catchError(err => throwError(err))
    );*/

    this.listVariableDesign.forEach((_variableDesign, index) => {
      if (_variableDesign.id === variableDesign.id) {
        this.listVariableDesign[index] = variableDesign;

        return false;
      }
    });

    const observable = new Observable<VariableDesign>(observer => {
      setTimeout(() => {
        observer.next(variableDesign);
      }, 1000);
    });

    return observable;
  }

  fn_delete(variableDesign: VariableDesign): Observable<boolean> {
    this.ngxService.startLoader(this.idLoader);

    const url = `${targetRules}variable/${variableDesign.id}`;
    return this.http.delete<boolean>(url).pipe(
      finalize(() => {
        this.ngxService.stopLoader(this.idLoader)
      }),
      catchError(err => throwError(err))
    );

    /*let _delete = false;
    this.listVariableDesign.forEach((_variableDesign, index) => {
      if (_variableDesign.id === variableDesign.id) {
        this.listVariableDesign.splice(index, 1);
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

function createNewVariableDesign(i: number, designId: number): VariableDesign {
  const variableDesign = new VariableDesign();
  variableDesign.id = i;
  variableDesign.designId = designId;
  variableDesign.windowId = 1000;
  variableDesign.htmlControlId = 2000;

  const variable = new Variable();
  variable.id = i + 1;
  variable.name = 'NVariable ' + i;
  variable.description = 'DVariable ' + i;

  const dataType = new DataType();
  dataType.id = i + 2;
  dataType.name = 'Tipo de dato ' + i;

  variable.dataType = dataType;
  variable.dataTypeId = dataType.id;

  variable.statusId = 1;
  variable.source = 'INPUT';
  variable.creationDate = new Date();
  variable.updateDate = new Date();

  variableDesign.variable = variable;
  variableDesign.value = 'Valor ' + i;
  variableDesign.type = 'I';
  variableDesign.scope = 'S';

  return variableDesign;
}
