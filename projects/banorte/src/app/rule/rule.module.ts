import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RuleRoutingModule } from './rule-routing.module';
import { RuleComponent } from './rule.component';
import { RuleConfigurationComponent } from './views/rule-configuration/rule-configuration.component';
import {MatButtonModule, MatCardModule, MatIconModule, MatTabsModule} from '@angular/material';
import { RuleVariableComponent } from './views/rule-variable/rule-variable.component';
import {RuleTableModule} from './components/rule-table/rule-table.module';
import {VariableDesignService} from './services/variable/variable-design.service';
import {LoaderModule} from '../../../../campaigns/src/lib/components/loader/loader.module';
import {RuleDialogModule} from './components/rule-dialog/rule-dialog.module';
import {DataTypeService} from './services/variable/data-type.service';
import {UtilsService} from '../../../../campaigns/src/lib/services/utils/utils.service';
import {AlertService} from '../../../../campaigns/src/lib/services/alert/alert.service';
import {DialogModule} from '../../../../campaigns/src/lib/components/dialog/dialog.module';
import { RuleServiceComponent } from './views/rule-service/rule-service.component';
import {ServiceDesignService} from './services/service/service-design.service';
import {DataSourceService} from './services/service/dataSource/data-source.service';
import {RuleVariableDialogService} from './components/rule-dialog/rule-variable-dialog/rule-variable-dialog.service';
import {RuleServiceDialogService} from './components/rule-dialog/rule-service-dialog/rule-service-dialog.service';
import { RuleExpressionComponent } from './views/rule-expression/rule-expression.component';
import {ExpressionService} from './services/expression/expression.service';
import {RuleExpressionDialogService} from './components/rule-dialog/rule-expression-dialog/rule-expression-dialog.service';

@NgModule({
  imports: [
    CommonModule,
    RuleRoutingModule,
    DialogModule,
    LoaderModule,
    RuleTableModule,
    RuleDialogModule,
    MatTabsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ],
  declarations: [
    RuleComponent,
    RuleConfigurationComponent,
    RuleVariableComponent,
    RuleServiceComponent,
    RuleExpressionComponent
  ],
  providers: [
    UtilsService,
    AlertService,
    RuleVariableDialogService,
    VariableDesignService,
    DataTypeService,
    RuleServiceDialogService,
    ServiceDesignService,
    DataSourceService,
    RuleExpressionDialogService,
    ExpressionService
  ]
})
export class RuleModule { }
