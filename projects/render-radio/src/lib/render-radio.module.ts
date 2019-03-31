import { NgModule } from '@angular/core';
import { RenderRadioComponent } from './render-radio.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    RenderRadioComponent
  ],
  exports: [
    RenderRadioComponent
  ],
  entryComponents: [
    RenderRadioComponent
  ]
})
export class RenderRadioModule { }
