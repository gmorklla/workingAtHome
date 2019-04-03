import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ServiceDesign} from '../../../models/service/service-design.model';
import {DataType} from '../../../models/variable/data-type.model';
import {DataSource} from '../../../models/service/dataSource/data-source.model';
import {RuleDataSourceFieldsControlComponent} from '../../rule-control/rule-data-source-fields-control/rule-data-source-fields-control.component';
import {Field} from '../../../models/service/dataSource/field/field.model';
import {DataSourceService} from '../../../services/service/dataSource/data-source.service';
import {Messages} from '../../../../shared/messages';
import {AlertService} from '../../../../../../../campaigns/src/lib/services/alert/alert.service';
import {VariableDesign} from '../../../models/variable/variable-design.model';

export interface RuleServiceDialogData {
  serviceDesign: ServiceDesign;
  source: string;
  type: string;
  scope: string;

  listDataType: DataType[];
  listVariableDesign: VariableDesign[];
}

@Component({
  selector: 'app-rule-service-dialog',
  templateUrl: './rule-service-dialog.component.html',
  styleUrls: ['./rule-service-dialog.component.css']
})
export class RuleServiceDialogComponent implements OnInit {

  public mainForm: FormGroup;
  public dataSource: DataSource;

  @ViewChild(RuleDataSourceFieldsControlComponent) fields: RuleDataSourceFieldsControlComponent;

  constructor(private formBuilder: FormBuilder,
              private dataSourceService: DataSourceService,
              private alertService: AlertService,
              public dialogRef: MatDialogRef<RuleServiceDialogComponent>,
              @Inject(MAT_DIALOG_DATA)
              public data: RuleServiceDialogData) { }

  ngOnInit() {
    this.createMainForm();
  }

  private createMainForm() {
    this.dataSource = this.data.serviceDesign.dataSource;

    this.mainForm = this.formBuilder.group({
      'dataSource': new FormControl(this.dataSource, [
        Validators.required,
        notSelected
      ]),
      'description': new FormControl(this.data.serviceDesign.description, [
        Validators.required
      ])
    });
  }

  /**
   * For validations
   */

  get description() {
    return this.mainForm.get('description');
  }

  fn_isInvalidFields(): boolean {
    if (!this.fields.listFields || (this.fields.listServiceFieldDesignIn.length === 0 && this.fields.listServiceFieldDesignOut.length === 0)) {
      return true;
    }

    let isInvalid = false;
    this.fields.listServiceFieldDesignIn.forEach((_field) => {
      if (!_field.modelFieldId || !_field.designVariableId) {
        isInvalid = true;

        return false;
      }
    });

    if (!isInvalid) {
      this.fields.listServiceFieldDesignOut.forEach((_field) => {
        if (!_field.modelFieldId || !_field.designVariableId) {
          isInvalid = true;

          return false;
        }
      });
    }
    return isInvalid;
  }

  fn_updateDataSource(dataSource: DataSource): void {
    this.dataSourceService.fn_get(dataSource.id).subscribe({
      next: (result: DataSource) => {
        console.log('[RESPONSE]', result);
        this.dataSource = result;

        this.fields.listFields = result.listaCampos;
        this.fields.fn_categorizeFields(true);
      },
      error: (error: any) => {
        console.log(error);
        this.alertService.fn_error(Messages.MSG015_RULE_DATA_SOURCE_GET_ERROR);
      },
      complete: () => {
        console.log('OK');
      }
    });
  }

  fn_onClose(): void {
    this.dialogRef.close();
  }

  fn_generateEntity(): ServiceDesign {
    const serviceDesign = new ServiceDesign();
    serviceDesign.id = this.data.serviceDesign.id;
    serviceDesign.designId = this.data.serviceDesign.designId;
    serviceDesign.windowId = this.data.serviceDesign.windowId;

    const dataSource = this.mainForm.value.dataSource;
    serviceDesign.dataSource = dataSource;
    serviceDesign.dataSourceId = dataSource ? dataSource.id : null;

    serviceDesign.description = this.mainForm.value.description;

    serviceDesign.fields = [];
    if (this.fields.listServiceFieldDesignIn && this.fields.listServiceFieldDesignOut) {
      this.fields.listServiceFieldDesignIn.forEach((_field) => {
        serviceDesign.fields.push(_field);
      });
      this.fields.listServiceFieldDesignOut.forEach((_field) => {
        serviceDesign.fields.push(_field);
      });
    }

    return serviceDesign;
  }
}

function notSelected(formControl: FormControl) {
  const condition = formControl.value != null && formControl.value.nombre === undefined;

  return condition ? {
    notSelected: {
      valid: true
    }
  } : null;
}
