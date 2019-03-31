import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RuleVariableSearchControlComponent } from './rule-variable-search-control/rule-variable-search-control.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule, MatInputModule, MatSelectModule} from '@angular/material';
import { RuleDataTypeSelectControlComponent } from './rule-data-type-select-control/rule-data-type-select-control.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  declarations: [
    RuleVariableSearchControlComponent,
    RuleDataTypeSelectControlComponent
  ],
  exports: [
    RuleVariableSearchControlComponent,
    RuleDataTypeSelectControlComponent
  ]
})
export class RuleControlModule { }
