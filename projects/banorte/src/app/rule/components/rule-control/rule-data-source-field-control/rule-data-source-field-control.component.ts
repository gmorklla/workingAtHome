import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Field} from '../../../models/service/dataSource/field/field.model';
import {ServiceFieldDesign} from '../../../models/service/service-field-design.model';
import {VariableDesign} from '../../../models/variable/variable-design.model';
import {ServiceDesign} from '../../../models/service/service-design.model';
import {VariableSource} from '../../../models/variable/variable-source.enum';
import {VariableType} from '../../../models/variable/variable-type.enum';
import {VariableScope} from '../../../models/variable/variable-scope.enum';
import {RuleVariableDialogService} from '../../rule-dialog/rule-variable-dialog/rule-variable-dialog.service';

@Component({
  selector: 'app-rule-data-source-field-control',
  templateUrl: './rule-data-source-field-control.component.html',
  styleUrls: ['./rule-data-source-field-control.component.css']
})
export class RuleDataSourceFieldControlComponent implements OnInit {

  @Input() public serviceDesign: ServiceDesign;
  @Input() public field: ServiceFieldDesign;
  @Input() public listFields: Field[];
  @Input() public listVariableDesign: VariableDesign[];

  @Output() public remove = new EventEmitter();

  public mainForm: FormGroup;
  public VariableSource = VariableSource;
  public VariableType = VariableType;
  public VariableScope = VariableScope;

  constructor(private ruleVariableDialogService: RuleVariableDialogService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createMainForm();
  }

  private createMainForm() {
    let idField = null;
    let variableDesign = null;

    if (this.field) {
      idField = this.field.modelFieldId;
      if (this.field.designVariableId) {
        variableDesign = this.ruleVariableDialogService.fn_getById(this.field.designVariableId);
      }
    }

    this.mainForm = this.formBuilder.group({
      'field': new FormControl(idField, [
        Validators.required
      ]),
      'variableDesign': new FormControl(variableDesign, [
        Validators.required,
        notSelected
      ])
    });
  }

  /**
   * For validations
   */

  get _field() {
    return this.mainForm.get('field');
  }

  get _variableDesign() {
    return this.mainForm.get('variableDesign');
  }

  fn_updateField(): void {
    this.field.modelFieldId = this.mainForm.value.field;
    this.field.designVariableId = this.mainForm.value.variableDesign ? this.mainForm.value.variableDesign.id : null;
  }

  fn_removeField(): void {
    this.remove.emit(this.field);
  }
}

function notSelected(formControl: FormControl) {
  const condition = formControl.value != null && formControl.value.id === undefined;

  return condition ? {
    'notSelected': {
      valid: true
    }
  } : null;
}
