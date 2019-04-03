import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { GridsterModule } from 'angular-gridster2';
import { LayoutModule } from '@angular/cdk/layout';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, LayoutModule, GridsterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
