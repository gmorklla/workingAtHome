import { NgModule } from '@angular/core';
import { RenderSelectComponent } from './render-select.component';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  declarations: [
    RenderSelectComponent
  ],
  exports: [
    RenderSelectComponent
  ],
  entryComponents: [
    RenderSelectComponent
  ]
})
export class RenderSelectModule { }
