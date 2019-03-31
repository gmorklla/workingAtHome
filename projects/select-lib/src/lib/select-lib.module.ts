import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AngularDraggableModule } from 'angular2-draggable';
import { SelectLibComponent } from './select-lib.component';
import { FormSelectLibComponent } from './form-select-lib/form-select-lib.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    DragDropModule,
    AngularDraggableModule
  ],
  declarations: [SelectLibComponent, FormSelectLibComponent],
  exports: [SelectLibComponent],
  entryComponents: [SelectLibComponent, FormSelectLibComponent]
})
export class SelectLibModule {}
