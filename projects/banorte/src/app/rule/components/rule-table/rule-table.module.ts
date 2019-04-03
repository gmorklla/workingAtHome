import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RuleVariableTableComponent } from './rule-variable-table/rule-variable-table.component';
import {
  MatButtonModule,
  MatFormFieldModule, MatIconModule, MatInputModule, MatPaginatorModule, MatSortModule,
  MatTableModule, MatTooltipModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RuleServiceTableComponent } from './rule-service-table/rule-service-table.component';
import { RuleExpressionTableComponent } from './rule-expression-table/rule-expression-table.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
  declarations: [
    RuleVariableTableComponent,
    RuleServiceTableComponent,
    RuleExpressionTableComponent
  ],
  exports: [
    RuleVariableTableComponent,
    RuleServiceTableComponent,
    RuleExpressionTableComponent
  ]
})
export class RuleTableModule { }
