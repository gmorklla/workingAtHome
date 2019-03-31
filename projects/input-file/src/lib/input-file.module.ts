import { NgModule } from '@angular/core';
import { InputFileComponent } from './input-file.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AngularDraggableModule } from 'angular2-draggable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    DragDropModule,
    AngularDraggableModule
  ],
  declarations: [InputFileComponent],
  exports: [InputFileComponent],
  entryComponents: [InputFileComponent]
})
export class InputFileModule {}
