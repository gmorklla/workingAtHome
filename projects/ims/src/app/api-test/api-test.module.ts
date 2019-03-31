import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiTestRoutingModule } from './api-test.routing.module';
import { CustomMaterialModule } from '../custom-material/custom-material.module';
import { TestComponent } from './test/test.component';

@NgModule({
  imports: [
    CommonModule,
    ApiTestRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CustomMaterialModule
  ],
  declarations: [TestComponent]
})
export class ApiTestModule {}
