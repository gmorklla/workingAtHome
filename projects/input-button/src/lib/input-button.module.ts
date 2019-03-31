import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputButtonComponent } from './input-button.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AngularDraggableModule } from 'angular2-draggable';
import { ColorPickerModule } from 'ngx-color-picker';
import { FormInputButtonComponent } from './form/form-input-button.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    ColorPickerModule,
    DragDropModule,
    AngularDraggableModule
  ],
  declarations: [InputButtonComponent, FormInputButtonComponent],
  exports: [InputButtonComponent],
  entryComponents: [InputButtonComponent, FormInputButtonComponent]
})
export class InputButtonModule {}
