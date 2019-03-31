import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material';
import {VariableDesign} from '../../models/variable/variable-design.model';
import {RuleVariableDialogComponent} from '../../components/rule-dialog/rule-variable-dialog/rule-variable-dialog.component';
import {DataType} from '../../models/variable/data-type.model';
import {VariableDesignService} from '../../services/variable/variable-design.service';
import {RuleVariableTableComponent} from '../../components/rule-table/rule-variable-table/rule-variable-table.component';
import {AlertService} from '../../../../../../campaigns/src/lib/services/alert/alert.service';
import {Messages} from '../../../shared/messages';
import {VariableType} from '../../models/variable/variable-type.enum';
import {VariableScope} from '../../models/variable/variable-scope.enum';
import {VariableSource} from '../../models/variable/variable-source.enum';

@Component({
  selector: 'app-rule-variable',
  templateUrl: './rule-variable.component.html',
  styleUrls: ['./rule-variable.component.css']
})
export class RuleVariableComponent implements OnInit {

  @Input() public designId: string;
  @Input() public windowId: string;
  @Input() public listDataType: DataType[];

  @ViewChild(RuleVariableTableComponent) table: RuleVariableTableComponent;

  constructor(private variableDesignService: VariableDesignService,
              private alertService: AlertService,
              private dialog: MatDialog) { }

  ngOnInit() {
  }

  /**
   * New variable
   */
  fn_openDialogForNew(): void {
    const variableDesign = new VariableDesign();
    variableDesign.id = null;
    variableDesign.designId = Number(this.designId);
    variableDesign.windowId = Number(this.windowId);
    variableDesign.htmlControlId = null;
    variableDesign.variable = null;
    variableDesign.value = null;

    const dialogRef = this.dialog.open(RuleVariableDialogComponent, {
      width: '500px',
      data: {
        variableDesign: variableDesign,
        source: VariableSource.BUSINESS,
        type: VariableType.DYNAMIC,
        scope: VariableScope.SESSION,
        listDataType: this.listDataType
      }
    });

    dialogRef.afterClosed().subscribe((result: VariableDesign) => {
      if (result !== undefined) {
        console.log('Creating...', result);
        this.variableDesignService.fn_save(result).subscribe({
          next: (result: VariableDesign) => {
            console.log('[RESPONSE]', result);
            if (result.id) {
              this.alertService.fn_success(Messages.MSG_RULE_VARIABLE_SAVE_SUCCESS);
            } else {
              this.alertService.fn_error(Messages.MSG_RULE_VARIABLE_SAVE_ERROR);
            }

            this.table.fn_refresh();
          },
          error: (error: any) => {
            console.log(error);
            this.alertService.fn_error(Messages.MSG_RULE_VARIABLE_SAVE_ERROR);
          },
          complete: () => {
            console.log('OK');
          }
        });
      }
    });
  }
}
