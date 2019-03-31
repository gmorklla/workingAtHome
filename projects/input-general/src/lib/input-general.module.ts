import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AngularDraggableModule } from 'angular2-draggable';
import { MatTooltipModule } from '@angular/material/tooltip';
import { InputGeneralComponent } from './input-general.component';
import { ResizableModule } from 'angular-resizable-element';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DragDropModule,
    AngularDraggableModule,
    MatTooltipModule,
    ResizableModule
  ],
  declarations: [InputGeneralComponent],
  exports: [InputGeneralComponent],
  entryComponents: [InputGeneralComponent]
})
export class InputGeneralModule {}
