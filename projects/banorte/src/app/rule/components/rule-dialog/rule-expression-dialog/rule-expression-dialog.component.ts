import {Component, Inject, OnInit} from '@angular/core';
import {Expression} from '../../../models/expression/expression.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {VariableDesign} from '../../../models/variable/variable-design.model';

export interface RuleExpressionDialogData {
  designId: number;
  windowId: number;
  expression: Expression;
  listVariableDesign: VariableDesign[];
}

@Component({
  selector: 'app-rule-expression-dialog',
  templateUrl: './rule-expression-dialog.component.html',
  styleUrls: ['./rule-expression-dialog.component.css']
})
export class RuleExpressionDialogComponent implements OnInit {

  public mainForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<RuleExpressionDialogComponent>,
              @Inject(MAT_DIALOG_DATA)
              public data: RuleExpressionDialogData) {
  }

  ngOnInit() {
    this.createMainForm();
  }

  private createMainForm() {
    const expression = JSON.parse(JSON.stringify(this.data.expression));
    console.log(expression);

    this.mainForm = this.formBuilder.group({
      'name': new FormControl(expression.name, [
        Validators.required
      ])
    });
  }

  /**
   * For validations
   */

  get name() {
    return this.mainForm.get('name');
  }

  fn_onClose(): void {
    this.dialogRef.close();
  }

  fn_generateEntity(): Expression {
    const expression = new Expression();

    return expression;
  }
}
