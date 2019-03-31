import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AngularDraggableModule } from 'angular2-draggable';
import { ImageComponentComponent } from './image-component.component';
import { FormImageComponentComponent } from './form-image-component/form-image-component.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    DragDropModule,
    AngularDraggableModule
  ],
  declarations: [ImageComponentComponent, FormImageComponentComponent],
  exports: [ImageComponentComponent],
  entryComponents: [ImageComponentComponent, FormImageComponentComponent]
})
export class ImageComponentModule {}
