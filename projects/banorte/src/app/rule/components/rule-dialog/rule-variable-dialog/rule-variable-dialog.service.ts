import { Injectable } from '@angular/core';
import {VariableDesignService} from '../../../services/variable/variable-design.service';
import {AlertService} from '../../../../../../../campaigns/src/lib/services/alert/alert.service';
import {MatDialog} from '@angular/material';
import {DataType} from '../../../models/variable/data-type.model';
import {VariableDesign} from '../../../models/variable/variable-design.model';
import {RuleVariableDialogComponent} from './rule-variable-dialog.component';
import {Messages} from '../../../../shared/messages';
import {RuleVariableTableComponent} from '../../rule-table/rule-variable-table/rule-variable-table.component';
import {DataTypeService} from '../../../services/variable/data-type.service';

export interface RuleVariableDialogServiceConfig {
  designId: number;
  windowId: number;
  source?: string;
  type?: string;
  scope?: string;
}

@Injectable()
export class RuleVariableDialogService {

  private table: RuleVariableTableComponent;
  private listDataType: DataType[];

  private variableDesignNew: VariableDesign;
  private variableDesignModified: VariableDesign;

  constructor(private variableDesignService: VariableDesignService,
              private dataTypeService: DataTypeService,
              private alertService: AlertService,
              private dialog: MatDialog) {
    this.getAllDataType();
  }

  init(table: RuleVariableTableComponent): void {
    this.table = table;
  }

  /**
   * Editor variable
   */
  open(variableDesign?: VariableDesign, config?: RuleVariableDialogServiceConfig): void {
    if (!variableDesign) {
      variableDesign = new VariableDesign();
      variableDesign.id = null;
      variableDesign.designId = config.designId;
      variableDesign.windowId = config.windowId;
      variableDesign.htmlControlId = null;
      variableDesign.variable = null;
      variableDesign.value = null;
    } else {
      config.source = variableDesign.variable.source;
      config.type = variableDesign.type;
      config.scope = variableDesign.scope;
    }

    const dialogRef = this.dialog.open(RuleVariableDialogComponent, {
      width: '500px',
      data: {
        variableDesign: variableDesign,
        source: config.source,
        type: config.type,
        scope: config.scope,
        listDataType: this.listDataType
      },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((result: VariableDesign) => {
      if (result !== undefined) {
        this.variableDesignNew = null;
        this.variableDesignModified = null;

        const save = result.id === null;

        console.log('Saving...', result);
        this.variableDesignService.fn_save(result).subscribe({
          next: (result: VariableDesign) => {
            console.log('[RESPONSE]', result);

            if (result.id) {
              if (save) {
                this.variableDesignNew = result;
                this.alertService.fn_success(Messages.MSG003_RULE_VARIABLE_SAVE_SUCCESS);
              } else {
                this.variableDesignModified = result;
                this.alertService.fn_success(Messages.MSG007_RULE_VARIABLE_UPDATE_SUCCESS);
              }

              if (this.table) {
                this.table.fn_refresh();
              }
            } else {
              if (save) {
                this.alertService.fn_error(Messages.MSG004_RULE_VARIABLE_SAVE_ERROR);
              } else {
                this.alertService.fn_error(Messages.MSG008_RULE_VARIABLE_UPDATE_ERROR);
              }
            }
          },
          error: (error: any) => {
            console.log(error);
            if (save) {
              this.alertService.fn_error(Messages.MSG004_RULE_VARIABLE_SAVE_ERROR);
            } else {
              this.alertService.fn_error(Messages.MSG008_RULE_VARIABLE_UPDATE_ERROR);
            }
          },
          complete: () => {
            console.log('OK');
          }
        });
      }
    });
  }

  private getAllDataType(): void {
    this.dataTypeService.fn_getAll().subscribe({
      next: (result: DataType[]) => {
        console.log('[RESPONSE]', result);
        this.listDataType = result;
      },
      error: (error: any) => {
        console.log(error);
        this.alertService.fn_error(Messages.MSG001_RULE_VARIABLE_DATA_TYPE_GET_ALL_ERROR);
      },
      complete: () => {
        console.log('OK');
      }
    })
  }

  fn_isNewEntity(variableDesign: VariableDesign): boolean {
    return this.variableDesignNew && variableDesign && this.variableDesignNew.id === variableDesign.id;
  }

  fn_isEntityModified(variableDesign: VariableDesign): boolean {
    return this.variableDesignModified && variableDesign && this.variableDesignModified.id === variableDesign.id;
  }

  fn_getById(idVariableDesign: number): VariableDesign {
    let variableDesign = null;
    this.table.dataSource.data.forEach((_variableDesign) => {
      if (_variableDesign.id === idVariableDesign) {
        variableDesign = _variableDesign;

        return false;
      }
    });
    return variableDesign;
  }
}
