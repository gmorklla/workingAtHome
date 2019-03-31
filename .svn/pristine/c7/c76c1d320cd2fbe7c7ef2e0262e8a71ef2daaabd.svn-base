import { NgModule } from '@angular/core';
import { FlowsComponent } from './flows.component';
import {FlowRoutingModule} from '../../../banorte/src/app/flow/flow-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule, MatButtonModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatListModule, MatMenuModule,
  MatPaginatorModule, MatSelectModule, MatSnackBarModule,
  MatTableModule,
  MatTooltipModule
} from '@angular/material';
import {AlertService} from '../../../campaigns/src/lib/services/alert/alert.service';
import {ChannelService} from '../../../campaigns/src/lib/services/channel.service';
import {LinkedChannelService} from '../../../campaigns/src/lib/services/linked-channel.service';
import {ConfigurationService} from '../../../campaigns/src/lib/services/configuration.service';
import {FilterComponent} from './components/filter/filter.component';
import {FlowService} from './services/flow.service';
import {UtilsService} from '../../../campaigns/src/lib/services/utils/utils.service';
import { CreateFlowComponent } from './views/create-flow/create-flow.component';
import { FlowFormComponent } from './components/form/flow-form/flow-form.component';
import { FlowFormEditComponent } from './components/form/flow-form-edit/flow-form-edit.component';
import { EditFlowComponent } from './views/edit-flow/edit-flow.component';
import {DialogModule} from '../../../campaigns/src/lib/components/dialog/dialog.module';
import {SectionModule} from '../../../campaigns/src/lib/components/section/section.module';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    FlowRoutingModule,
    DialogModule,
    SectionModule,
    MatTooltipModule,
    MatTableModule,
    MatFormFieldModule,
    MatButtonModule,
    MatBottomSheetModule,
    MatInputModule,
    MatCheckboxModule,
    MatIconModule,
    MatPaginatorModule,
    MatCardModule,
    MatSelectModule,
    MatListModule,
    MatDividerModule,
    MatDialogModule,
    MatBadgeModule,
    MatMenuModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatChipsModule,
    MatAutocompleteModule
  ],
  declarations: [
    FlowFormComponent,
    FlowFormEditComponent,
    FilterComponent,
    FlowsComponent,
    CreateFlowComponent,
    EditFlowComponent
  ],
  exports: [
    FlowsComponent,
    CreateFlowComponent,
    EditFlowComponent
  ],
  providers: [
    AlertService,
    UtilsService,
    ChannelService,
    LinkedChannelService,
    FlowService,
    ConfigurationService
  ]
})
export class FlowsModule { }
