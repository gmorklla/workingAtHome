import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {VariableDesign} from '../../../models/variable/variable-design.model';
import {DataType} from '../../../models/variable/data-type.model';
import {Variable} from '../../../models/variable/variable.model';
import {Status} from '../../../../models/status.enum';

export interface RuleVariableDialogData {
  variableDesign: VariableDesign;
  source: string;
  type: string;
  scope: string;

  listDataType: DataType[];
}

@Component({
  selector: 'app-rule-variable-dialog',
  templateUrl: './rule-variable-dialog.component.html',
  styleUrls: ['./rule-variable-dialog.component.css']
})
export class RuleVariableDialogComponent implements OnInit {

  public mainForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<RuleVariableDialogComponent>,
              @Inject(MAT_DIALOG_DATA)
              public data: RuleVariableDialogData) {
  }

  ngOnInit() {
    this.createMainForm();
  }

  private createMainForm() {
    const variableDesign = JSON.parse(JSON.stringify(this.data.variableDesign));
    console.log(variableDesign);

    let variable = null;
    let description = null;
    let dataType = null;
    let value = null;

    if (variableDesign) {
      if (variableDesign.variable) {
        variable = variableDesign.variable;
        description = variableDesign.variable.description;
        dataType = variableDesign.variable.dataType;
      }
      value = variableDesign.value;
    }

    this.mainForm = this.formBuilder.group({
      'variable': new FormControl(variable, [
        Validators.required
      ]),
      'value': new FormControl(value),
      'dataType': new FormControl(dataType, [
        Validators.required
      ]),
      'description': new FormControl(description, [
        Validators.required
      ])
    });
  }

  /**
   * For validations
   */

  get value() {
    return this.mainForm.get('value');
  }

  get description() {
    return this.mainForm.get('description');
  }

  fn_updateVariable(variable: Variable): void {
    this.mainForm.patchValue({
      'dataType': variable.dataType,
      'description': variable.description
    });
  }

  fn_onClose(): void {
    this.dialogRef.close();
  }

  fn_generateEntity(): VariableDesign {
    const variableDesign = new VariableDesign();
    variableDesign.id = this.data.variableDesign.id;
    variableDesign.designId = this.data.variableDesign.designId;
    variableDesign.windowId = this.data.variableDesign.windowId;
    variableDesign.htmlControlId = this.data.variableDesign.htmlControlId;

    let variable = this.mainForm.value.variable;
    if (variable) {
      if (!variable.name) {
        // TODO: YDM - Consultar por nombre

        variable = new Variable();
        variable.name = this.mainForm.value.variable;
        variable.source = this.data.source;
      }
      variable.statusId = Status.ACTIVE;
      variable.dataType = this.mainForm.value.dataType;
      variable.description = this.mainForm.value.description;
    }

    variableDesign.variable = variable;
    variableDesign.value = this.mainForm.value.value;
    variableDesign.type = this.data.type;
    variableDesign.scope = this.data.scope;
    return variableDesign;
  }
}
