import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ConfigurationDialogComponent} from './configuration-dialog/configuration-dialog.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatBottomSheetModule, MatButtonModule, MatCardModule, MatCheckboxModule, MatDialogModule, MatFormFieldModule,
  MatInputModule,
  MatSelectModule
} from '@angular/material';
import {ConfirmationDialogComponent} from './confirmation-dialog/confirmation-dialog.component';
import {LinkedChannelDialogComponent} from './linked-channel-dialog/linked-channel-dialog.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatBottomSheetModule,
    MatSelectModule,
    MatDialogModule,
    MatCardModule,
    MatCheckboxModule
  ],
  declarations: [
    ConfigurationDialogComponent,
    ConfirmationDialogComponent,
    LinkedChannelDialogComponent
  ],
  entryComponents: [
    ConfigurationDialogComponent,
    ConfirmationDialogComponent,
    LinkedChannelDialogComponent
  ]
})
export class DialogModule { }
