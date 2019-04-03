import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { GridsterModule } from 'angular-gridster2';
import { LayoutModule } from '@angular/cdk/layout';

import { AppComponent } from './app.component';
import { DynamicDirective } from './dynamic.directive';
import { InputGComponent } from './input-g/input-g.component';
import { DynamicComponent } from './dynamic/dynamic.component';

@NgModule({
  declarations: [AppComponent, DynamicDirective, InputGComponent, DynamicComponent],
  imports: [BrowserModule, LayoutModule, GridsterModule],
  providers: [],
  entryComponents: [InputGComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
