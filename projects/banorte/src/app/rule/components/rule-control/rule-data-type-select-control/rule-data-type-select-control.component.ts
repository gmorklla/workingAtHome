import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {DataTypeService} from '../../../services/variable/data-type.service';
import {DataType} from '../../../models/variable/data-type.model';

@Component({
  selector: 'app-rule-data-type-select-control',
  templateUrl: './rule-data-type-select-control.component.html',
  styleUrls: ['./rule-data-type-select-control.component.css']
})
export class RuleDataTypeSelectControlComponent implements OnInit {

  @Input() public parentForm: FormGroup;
  @Input() public listDataType: DataType[];

  constructor(private dataTypeService: DataTypeService) { }

  ngOnInit() {
    if (!this.listDataType) {
      this.getAllDataType();
    }
  }

  /**
   * For validations
   */

  get variableDataType() {
    return this.parentForm.get('variableDataType');
  }

  private getAllDataType(): void {
    this.dataTypeService.fn_getAll().subscribe({
      next: (result: DataType[]) => {
        console.log('[RESPONSE]', result);
        this.listDataType = result;
      },
      error: (error: any) => {
        console.log(error);
        // this.alertasService.operacionFallida(error.message);
      },
      complete: () => {
        console.log('OK');
      }
    })
  }
}
