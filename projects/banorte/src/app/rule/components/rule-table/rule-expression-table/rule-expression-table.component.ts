import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource, Sort} from '@angular/material';
import {Expression} from '../../../models/expression/expression.model';
import {RuleExpressionDialogService} from '../../rule-dialog/rule-expression-dialog/rule-expression-dialog.service';
import {ExpressionService} from '../../../services/expression/expression.service';
import {AlertService} from '../../../../../../../campaigns/src/lib/services/alert/alert.service';
import {UtilsService} from '../../../../../../../campaigns/src/lib/services/utils/utils.service';
import {Messages} from '../../../../shared/messages';
import {RuleVariableComponent} from '../../../views/rule-variable/rule-variable.component';
import {ConfirmationDialogComponent} from '../../../../../../../campaigns/src/lib/components/dialog/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-rule-expression-table',
  templateUrl: './rule-expression-table.component.html',
  styleUrls: ['./rule-expression-table.component.css']
})
export class RuleExpressionTableComponent implements OnInit {

  @Input() private designId: number;
  @Input() private windowId: number;
  @Input() private ruleVariableComponent: RuleVariableComponent;

  search = new FormControl('');

  displayedColumns: string[] = ['id', 'name', 'type', 'expression', 'naturalExpression', 'resultVariable', 'delete'];
  dataSource: MatTableDataSource<Expression>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private ruleExpressionDialogService: RuleExpressionDialogService,
              private expressionService: ExpressionService,
              private alertService: AlertService,
              private utilsService: UtilsService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.fn_getAllExpression();
  }

  private fn_getAllExpression(): void {
    this.expressionService.fn_getAll(this.windowId).subscribe({
      next: (result: Expression[]) => {
        console.log('[RESPONSE]', result);

        if (!this.dataSource) {
          this.dataSource = new MatTableDataSource<Expression>(result);
        } else {
          this.dataSource.data.length = 0;
          result.forEach((_expression) => {
            this.dataSource.data.push(_expression);
          });
        }
        this.dataSource.filterPredicate = (expression: Expression, filterValue: string) => {
          const _filterValue = this.utilsService.fn_normalize(filterValue.trim());
          const _expressionName = this.utilsService.fn_normalize(expression.name.trim());
          const _expressionExpression = this.utilsService.fn_normalize(expression.expression.trim());
          const _expressionNaturalExpression = this.utilsService.fn_normalize(expression.naturalExpression.trim());
          const _expressionResultVariable = expression.resultVariable ? this.utilsService.fn_normalize(expression.resultVariable.variable.name.trim()) : '';

          return _expressionName.toLowerCase().indexOf(_filterValue) !== -1
            || _expressionExpression.toLowerCase().indexOf(_filterValue) !== -1
            || _expressionNaturalExpression.toLowerCase().indexOf(_filterValue) !== -1
            || _expressionResultVariable.toLowerCase().indexOf(_filterValue) !== -1;
        };
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error: any) => {
        console.log(error);
        this.alertService.fn_error(Messages.MSG024_RULE_EXPRESSION_GET_ALL_ERROR);
      },
      complete: () => {
        console.log('OK');
      }
    });
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  fn_resetFilter(): void {
    this.search.patchValue('');
    this.applyFilter('');
  }

  fn_applySort(sort: Sort): void {
    const data = this.dataSource.data;
    if (!sort.active || sort.direction === '') {
      this.dataSource.data = data.sort((a, b) => {
        return this.utilsService.fn_compare(a.id, b.id, true);
      });
      return;
    }

    this.dataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id': return this.utilsService.fn_compare(a.id, b.id, isAsc);
        case 'name': return this.utilsService.fn_compare(a.name, b.name, isAsc);
        case 'type': return this.utilsService.fn_compare(a.type, b.type, isAsc);
        case 'expression': return this.utilsService.fn_compare(a.expression, b.expression, isAsc);
        case 'naturalExpression': return this.utilsService.fn_compare(a.naturalExpression, b.naturalExpression, isAsc);
        case 'resultVariable': return this.utilsService.fn_compare(a.resultVariable.variable.name, b.resultVariable.variable.name, isAsc);
        default: return 0;
      }
    });
  }

  fn_refresh(): void {
    this.fn_getAllExpression();
    this.fn_resetFilter();
  }

  /**
   * Edit expression
   */
  fn_openDialogForEdit(expression: Expression): void {
    console.log('expression: ', expression);

    this.ruleExpressionDialogService.open(expression,
      {
        designId: this.designId,
        windowId: this.windowId,
        listVariableDesign: this.ruleVariableComponent.table.dataSource ? this.ruleVariableComponent.table.dataSource.data: []
      });
  }

  /**
   * Delete expression
   */
  fn_openDialogForDelete(expression: Expression): void {
    console.log('expression: ', expression);

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: {
        title: 'Eliminar',
        info: 'La expresión <strong>' + expression.name + '</strong> será eliminada'
      }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result === true) {
        this.expressionService.fn_delete(expression).subscribe({
          next: (result: boolean) => {
            console.log('[RESPONSE]', result);
            if (result === true) {
              this.alertService.fn_success(Messages.MSG025_RULE_EXPRESSION_DELETE_SUCCESS);
            } else {
              this.alertService.fn_error(Messages.MSG026_RULE_EXPRESSION_DELETE_ERROR);
            }

            this.fn_refresh();
          },
          error: (error: any) => {
            console.log(error);
            this.alertService.fn_error(Messages.MSG026_RULE_EXPRESSION_DELETE_ERROR);
          },
          complete: () => {
            console.log('OK');
          }
        });
      }
    });
  }
}
