import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {RuleServiceDialogComponent} from '../../components/rule-dialog/rule-service-dialog/rule-service-dialog.component';
import {ServiceDesign} from '../../models/service/service-design.model';
import {ServiceDesignService} from '../../services/service/service-design.service';
import {AlertService} from '../../../../../../campaigns/src/lib/services/alert/alert.service';
import {MatDialog} from '@angular/material';
import {RuleServiceTableComponent} from '../../components/rule-table/rule-service-table/rule-service-table.component';
import {Messages} from '../../../shared/messages';
import {VariableSource} from '../../models/variable/variable-source.enum';
import {VariableType} from '../../models/variable/variable-type.enum';
import {VariableScope} from '../../models/variable/variable-scope.enum';
import {DataType} from '../../models/variable/data-type.model';

@Component({
  selector: 'app-rule-service',
  templateUrl: './rule-service.component.html',
  styleUrls: ['./rule-service.component.css']
})
export class RuleServiceComponent implements OnInit {

  @Input() public designId: string;
  @Input() public windowId: string;
  @Input() public listDataType: DataType[];

  @ViewChild(RuleServiceTableComponent) table: RuleServiceTableComponent;

  constructor(private serviceDesignService: ServiceDesignService,
              private alertService: AlertService,
              private dialog: MatDialog) { }

  ngOnInit() {
  }

  /**
   * New service
   */
  fn_openDialogForNew(): void {
    const serviceDesign = new ServiceDesign();
    serviceDesign.id = null;
    serviceDesign.designId = Number(this.designId);
    serviceDesign.windowId = Number(this.windowId);
    serviceDesign.dataSource = null;
    serviceDesign.description = null;
    serviceDesign.fields = [];

    const dialogRef = this.dialog.open(RuleServiceDialogComponent, {
      width: '1000px',
      data: {
        serviceDesign: serviceDesign,
        source: VariableSource.SERVICE,
        type: VariableType.DYNAMIC,
        scope: VariableScope.SESSION,
        listDataType: this.listDataType
      }
    });

    dialogRef.afterClosed().subscribe((result: ServiceDesign) => {
      if (result !== undefined) {
        console.log('Creating...', result);
        this.serviceDesignService.fn_save(result).subscribe({
          next: (result: ServiceDesign) => {
            console.log('[RESPONSE]', result);
            if (result.id) {
              this.alertService.fn_success(Messages.MSG_RULE_SERVICE_SAVE_SUCCESS);
            } else {
              this.alertService.fn_error(Messages.MSG_RULE_SERVICE_SAVE_ERROR);
            }

            this.table.fn_refresh();
          },
          error: (error: any) => {
            console.log(error);
            this.alertService.fn_error(Messages.MSG_RULE_SERVICE_SAVE_ERROR);
          },
          complete: () => {
            console.log('OK');
          }
        });
      }
    });
  }
}
