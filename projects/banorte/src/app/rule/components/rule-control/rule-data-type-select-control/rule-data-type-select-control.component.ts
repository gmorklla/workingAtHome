import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {DataTypeService} from '../../../services/variable/data-type.service';
import {DataType} from '../../../models/variable/data-type.model';
import {Messages} from '../../../../shared/messages';
import {AlertService} from '../../../../../../../campaigns/src/lib/services/alert/alert.service';
import {UtilsService} from '../../../../../../../campaigns/src/lib/services/utils/utils.service';

@Component({
  selector: 'app-rule-data-type-select-control',
  templateUrl: './rule-data-type-select-control.component.html',
  styleUrls: ['./rule-data-type-select-control.component.css']
})
export class RuleDataTypeSelectControlComponent implements OnInit {

  @Input() public parentForm: FormGroup;
  @Input() public listDataType: DataType[];

  constructor(private dataTypeService: DataTypeService,
              private alertService: AlertService,
              public utilsService: UtilsService) { }

  ngOnInit() {
    if (!this.listDataType) {
      this.getAllDataType();
    }
  }

  /**
   * For validations
   */

  get dataType() {
    return this.parentForm.get('dataType');
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
}
