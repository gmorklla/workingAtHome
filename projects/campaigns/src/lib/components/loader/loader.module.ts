import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoaderComponent} from './loader.component';
import {NgxUiLoaderModule} from 'ngx-ui-loader';

@NgModule({
  imports: [
    CommonModule,
    NgxUiLoaderModule
  ],
  declarations: [
    LoaderComponent
  ],
  exports: [
    LoaderComponent
  ]
})
export class LoaderModule { }
