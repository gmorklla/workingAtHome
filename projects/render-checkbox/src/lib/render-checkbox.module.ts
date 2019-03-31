import { NgModule } from '@angular/core';
import { RenderCheckboxComponent } from './render-checkbox.component';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    RenderCheckboxComponent
  ],
  exports: [
    RenderCheckboxComponent
  ],
  entryComponents: [
    RenderCheckboxComponent
  ]
})
export class RenderCheckboxModule { }
