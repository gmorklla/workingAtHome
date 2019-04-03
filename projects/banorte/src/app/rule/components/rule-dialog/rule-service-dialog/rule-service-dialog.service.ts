import { Injectable } from '@angular/core';
import {RuleServiceTableComponent} from '../../rule-table/rule-service-table/rule-service-table.component';
import {ServiceDesignService} from '../../../services/service/service-design.service';
import {AlertService} from '../../../../../../../campaigns/src/lib/services/alert/alert.service';
import {MatDialog} from '@angular/material';
import {ServiceDesign} from '../../../models/service/service-design.model';
import {RuleServiceDialogComponent} from './rule-service-dialog.component';
import {Messages} from '../../../../shared/messages';
import {VariableDesign} from '../../../models/variable/variable-design.model';

export interface RuleServiceDialogServiceConfig {
  designId: number;
  windowId: number;
  listVariableDesign: VariableDesign[];
}

@Injectable()
export class RuleServiceDialogService {

  private table: RuleServiceTableComponent;

  private serviceDesignNew: ServiceDesign;
  private serviceDesignModified: ServiceDesign;

  constructor(private serviceDesignService: ServiceDesignService,
              private alertService: AlertService,
              private dialog: MatDialog) { }

  init(table: RuleServiceTableComponent): void {
    this.table = table;
  }

  /**
   * Editor service
   */
  open(serviceDesign?: ServiceDesign, config?: RuleServiceDialogServiceConfig): void {
    if (!serviceDesign) {
      serviceDesign = new ServiceDesign();
      serviceDesign.id = null;
      serviceDesign.designId = config.designId;
      serviceDesign.windowId = config.windowId;
      serviceDesign.dataSource = null;
      serviceDesign.description = null;
      serviceDesign.fields = [];
    }

    const dialogRef = this.dialog.open(RuleServiceDialogComponent, {
      width: '1000px',
      data: {
        serviceDesign: serviceDesign,
        listVariableDesign: config.listVariableDesign
      },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((result: ServiceDesign) => {
      if (result !== undefined) {
        this.serviceDesignNew = null;
        this.serviceDesignModified = null;

        if (!result.id) {
          console.log('Creating...', result);
          this.serviceDesignService.fn_save(result).subscribe({
            next: (result: ServiceDesign) => {
              console.log('[RESPONSE]', result);
              if (result.id) {
                this.serviceDesignNew = result;
                this.alertService.fn_success(Messages.MSG010_RULE_SERVICE_SAVE_SUCCESS);

                if (this.table) {
                  this.table.fn_refresh();
                }
              } else {
                this.alertService.fn_error(Messages.MSG011_RULE_SERVICE_SAVE_ERROR);
              }
            },
            error: (error: any) => {
              console.log(error);
              this.alertService.fn_error(Messages.MSG011_RULE_SERVICE_SAVE_ERROR);
            },
            complete: () => {
              console.log('OK');
            }
          });
        } else {
          console.log('Updating...', result);
          this.serviceDesignService.fn_update(result).subscribe({
            next: (result: ServiceDesign) => {
              console.log('[RESPONSE]', result);
              if (result.id) {
                this.serviceDesignModified = result;
                this.alertService.fn_success(Messages.MSG018_RULE_SERVICE_UPDATE_SUCCESS);

                if (this.table) {
                  this.table.fn_refresh();
                }
              } else {
                this.alertService.fn_error(Messages.MSG019_RULE_SERVICE_UPDATE_ERROR);
              }
            },
            error: (error: any) => {
              console.log(error);
              this.alertService.fn_error(Messages.MSG019_RULE_SERVICE_UPDATE_ERROR);
            },
            complete: () => {
              console.log('OK');
            }
          });
        }
      }
    });
  }

  fn_isNewEntity(serviceDesign: ServiceDesign): boolean {
    return this.serviceDesignNew && serviceDesign && this.serviceDesignNew.id === serviceDesign.id;
  }

  fn_isEntityModified(serviceDesign: ServiceDesign): boolean {
    return this.serviceDesignModified && serviceDesign && this.serviceDesignModified.id === serviceDesign.id;
  }
}
