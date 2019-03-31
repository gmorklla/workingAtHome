import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { HttpCallComponent } from './http-call.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  imports: [HttpModule, HttpClientModule, MatSnackBarModule],
  declarations: [HttpCallComponent],
  exports: [HttpCallComponent]
})
export class HttpCallModule {}
