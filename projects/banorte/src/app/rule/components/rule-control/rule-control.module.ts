import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RuleVariableSearchControlComponent } from './rule-variable-search-control/rule-variable-search-control.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatAutocompleteModule, MatBadgeModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatTabsModule, MatTooltipModule
} from '@angular/material';
import { RuleDataTypeSelectControlComponent } from './rule-data-type-select-control/rule-data-type-select-control.component';
import { RuleDataSourceSearchControlComponent } from './rule-data-source-search-control/rule-data-source-search-control.component';
import { RuleDataSourceFieldsControlComponent } from './rule-data-source-fields-control/rule-data-source-fields-control.component';
import { RuleDataSourceFieldControlComponent } from './rule-data-source-field-control/rule-data-source-field-control.component';
import {VariableService} from '../../services/variable/variable.service';
import { RuleVariableDesignSearchControlComponent } from './rule-variable-design-search-control/rule-variable-design-search-control.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatTabsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatBadgeModule
  ],
  declarations: [
    RuleVariableSearchControlComponent,
    RuleDataTypeSelectControlComponent,
    RuleDataSourceSearchControlComponent,
    RuleDataSourceFieldsControlComponent,
    RuleDataSourceFieldControlComponent,
    RuleVariableDesignSearchControlComponent
  ],
  exports: [
    RuleVariableSearchControlComponent,
    RuleDataTypeSelectControlComponent,
    RuleDataSourceSearchControlComponent,
    RuleDataSourceFieldsControlComponent,
    RuleVariableDesignSearchControlComponent
  ],
  providers: [
    VariableService
  ]
})
export class RuleControlModule { }
