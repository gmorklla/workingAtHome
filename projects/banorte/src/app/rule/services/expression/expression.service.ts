import { Injectable } from '@angular/core';
import {Loadable} from '../../../../../../campaigns/src/lib/components/loader/loadable.interface';
import {Expression} from '../../models/expression/expression.model';
import {HttpClient} from '@angular/common/http';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {catchError, finalize} from 'rxjs/internal/operators';
import {throwError} from 'rxjs/index';
import {Observable} from 'rxjs/Rx';
import {ExpressionType} from '../../models/expression/expression-type.enum';
import {VariableDesign} from '../../models/variable/variable-design.model';
import {VariableType} from '../../models/variable/variable-type.enum';
import {VariableScope} from '../../models/variable/variable-scope.enum';
import {Variable} from '../../models/variable/variable.model';

@Injectable()
export class ExpressionService implements Loadable {

  idLoader = 'loader-01';

  private listExpression: Expression[];
  private idSeq = 3;

  constructor(private http: HttpClient,
              private ngxService: NgxUiLoaderService) {
    this.listExpression = Array.from({length: this.idSeq}, (_, k) => createNewExpression(k + 1, 800));
  }

  fn_getAll(windowId: number): Observable<Expression[]> {
    /*this.ngxService.startLoader(this.idLoader);

    const params = new HttpParams()
      .set('windowId', windowId);

    const url = `${target}expression`;
    return this.http.get<Expression[]>(url, {params}).pipe(
      finalize(() => {
        this.ngxService.stopLoader(this.idLoader)
      }),
      catchError(err => throwError(err))
    );*/

    const observable = new Observable<Expression[]>(observer => {
      setTimeout(() => {
        observer.next(this.listExpression.slice(0));
      }, 1000);
    });

    return observable;
  }

  fn_save(expression: Expression): Observable<Expression> {
    /*this.ngxService.startLoader(this.idLoader);

    const url = `${target}expression`;
    return this.http.post<Expression>(url, expression).pipe(
      finalize(() => {
        this.ngxService.stopLoader(this.idLoader)
      }),
      catchError(err => throwError(err))
    );*/

    this.idSeq = this.idSeq + 1;
    expression.id = this.idSeq;

    this.listExpression.unshift(expression);

    const observable = new Observable<Expression>(observer => {
      setTimeout(() => {
        observer.next(expression);
      }, 1000);
    });

    return observable;
  }

  fn_update(expression: Expression): Observable<Expression> {
    /*this.ngxService.startLoader(this.idLoader);

    const url = `${target}rule/service/serviceDesign`;
    return this.http.put<Expression>(url, expression).pipe(
      finalize(() => {
        this.ngxService.stopLoader(this.idLoader)
      }),
      catchError(err => throwError(err))
    );*/

    this.listExpression.forEach((_expression, index) => {
      if (_expression.id === expression.id) {
        this.listExpression[index] = expression;

        return false;
      }
    });

    const observable = new Observable<Expression>(observer => {
      setTimeout(() => {
        observer.next(expression);
      }, 1000);
    });

    return observable;
  }

  fn_delete(expression: Expression): Observable<boolean> {
    /*this.ngxService.startLoader(this.idLoader);

    const url = `${target}expression/${expression.id}`;
    return this.http.delete<Expression>(url).pipe(
      finalize(() => {
        this.ngxService.stopLoader(this.idLoader)
      }),
      catchError(err => throwError(err))
    );*/

    let _delete = false;
    this.listExpression.forEach((_expression, index) => {
      if (_expression.id === expression.id) {
        this.listExpression.splice(index, 1);
        _delete = true;

        return false;
      }
    });

    const observable = new Observable<boolean>(observer => {
      setTimeout(() => {
        observer.next(_delete);
      }, 1000);
    });

    return observable;
  }
}

function createNewExpression(i: number, windowId: number): Expression {
  const expression = new Expression();
  expression.id = i;
  expression.windowId = windowId;
  expression.name = 'Expression ' + i;
  expression.type = ExpressionType.LOGICAL;
  expression.expression = 'a == b';
  expression.naturalExpression = '$a es igual a $b';

  const resultVariable = new VariableDesign();
  resultVariable.id = i;
  resultVariable.designId = null;
  resultVariable.windowId = windowId;
  resultVariable.htmlControlId = null;

  const variable = new Variable();
  variable.id = i;
  variable.name = 'Variable ' + i;
  variable.description = 'Descripción ' + i;
  resultVariable.variable = variable;

  resultVariable.value = null;
  resultVariable.type = VariableType.DYNAMIC;
  resultVariable.scope = VariableScope.SESSION;
  expression.resultVariable = resultVariable;

  expression.naturalExpression = '$a es igual a $b';
  expression.creationDate = new Date();
  expression.updateDate = new Date();

  return expression;
}
