import { Injectable } from '@angular/core';
import {RuleExpressionTableComponent} from '../../rule-table/rule-expression-table/rule-expression-table.component';
import {Expression} from '../../../models/expression/expression.model';
import {ExpressionService} from '../../../services/expression/expression.service';
import {AlertService} from '../../../../../../../campaigns/src/lib/services/alert/alert.service';
import {MatDialog} from '@angular/material';
import {RuleExpressionDialogComponent} from './rule-expression-dialog.component';
import {Messages} from '../../../../shared/messages';
import {VariableDesign} from '../../../models/variable/variable-design.model';

export interface RuleExpressionDialogServiceConfig {
  designId: number;
  windowId: number;
  listVariableDesign: VariableDesign[];
}

@Injectable()
export class RuleExpressionDialogService {

  private table: RuleExpressionTableComponent;

  private expressionNew: Expression;
  private expressionModified: Expression;

  constructor(private expressionService: ExpressionService,
              private alertService: AlertService,
              private dialog: MatDialog) { }

  init(table: RuleExpressionTableComponent): void {
    this.table = table;
  }

  /**
   * Editor expression
   */
  open(expression?: Expression, config?: RuleExpressionDialogServiceConfig): void {
    if (!expression) {
      expression = new Expression();
      expression.id = null;
      expression.windowId = config.windowId;
    }

    const dialogRef = this.dialog.open(RuleExpressionDialogComponent, {
      width: '1000px',
      data: {
        designId: config.designId,
        windowId: config.windowId,
        expression: expression,
        listVariableDesign: config.listVariableDesign
      },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((result: Expression) => {
      if (result !== undefined) {
        this.expressionNew = null;
        this.expressionModified = null;

        if (!result.id) {
          console.log('Creating...', result);
          this.expressionService.fn_save(result).subscribe({
            next: (result: Expression) => {
              console.log('[RESPONSE]', result);
              if (result.id) {
                this.expressionNew = result;
                this.alertService.fn_success(Messages.MSG020_RULE_EXPRESSION_SAVE_SUCCESS);

                if (this.table) {
                  this.table.fn_refresh();
                }
              } else {
                this.alertService.fn_error(Messages.MSG021_RULE_EXPRESSION_SAVE_ERROR);
              }
            },
            error: (error: any) => {
              console.log(error);
              this.alertService.fn_error(Messages.MSG021_RULE_EXPRESSION_SAVE_ERROR);
            },
            complete: () => {
              console.log('OK');
            }
          });
        } else {
          console.log('Updating...', result);
          this.expressionService.fn_update(result).subscribe({
            next: (result: Expression) => {
              console.log('[RESPONSE]', result);
              if (result.id) {
                this.expressionModified = result;
                this.alertService.fn_success(Messages.MSG022_RULE_EXPRESSION_UPDATE_SUCCESS);

                if (this.table) {
                  this.table.fn_refresh();
                }
              } else {
                this.alertService.fn_error(Messages.MSG023_RULE_EXPRESSION_UPDATE_ERROR);
              }
            },
            error: (error: any) => {
              console.log(error);
              this.alertService.fn_error(Messages.MSG023_RULE_EXPRESSION_UPDATE_ERROR);
            },
            complete: () => {
              console.log('OK');
            }
          });
        }
      }
    });
  }

  fn_isNewEntity(expression: Expression): boolean {
    return this.expressionNew && expression && this.expressionNew.id === expression.id;
  }

  fn_isEntityModified(expression: Expression): boolean {
    return this.expressionModified && expression && this.expressionModified.id === expression.id;
  }
}
