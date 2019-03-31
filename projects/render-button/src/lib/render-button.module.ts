import { NgModule } from '@angular/core';
import { RenderButtonComponent } from './render-button.component';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  declarations: [
    RenderButtonComponent
  ],
  exports: [
    RenderButtonComponent
  ],
  entryComponents: [
    RenderButtonComponent
  ]
})
export class RenderButtonModule { }
