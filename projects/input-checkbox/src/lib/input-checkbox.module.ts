import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AngularDraggableModule } from 'angular2-draggable';
import { MatTooltipModule } from '@angular/material/tooltip';
import { InputCheckboxComponent } from './input-checkbox.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DragDropModule,
    AngularDraggableModule,
    MatTooltipModule
  ],
  declarations: [InputCheckboxComponent],
  exports: [InputCheckboxComponent],
  entryComponents: [InputCheckboxComponent]
})
export class InputCheckboxModule {}
