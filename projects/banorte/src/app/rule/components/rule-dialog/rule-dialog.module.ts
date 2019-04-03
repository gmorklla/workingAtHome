import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RuleVariableDialogComponent } from './rule-variable-dialog/rule-variable-dialog.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule} from '@angular/material';
import {RuleControlModule} from '../rule-control/rule-control.module';
import { RuleServiceDialogComponent } from './rule-service-dialog/rule-service-dialog.component';
import { RuleExpressionDialogComponent } from './rule-expression-dialog/rule-expression-dialog.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RuleControlModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  declarations: [
    RuleVariableDialogComponent,
    RuleServiceDialogComponent,
    RuleExpressionDialogComponent
  ],
  entryComponents: [
    RuleVariableDialogComponent,
    RuleServiceDialogComponent,
    RuleExpressionDialogComponent
  ]
})
export class RuleDialogModule { }
