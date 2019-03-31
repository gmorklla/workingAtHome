import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login.routing.module';
import { LoginComponent } from './login/login.component';
import { LoginLibModule } from 'projects/login/src/public_api';
import { MatButtonModule, MatCardModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    LoginLibModule,
    MatButtonModule,
    MatCardModule
  ],
  declarations: [LoginComponent]
})
export class LoginModule {}
