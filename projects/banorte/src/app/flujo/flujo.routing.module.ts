import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlujoComponent } from './flujo/flujo.component';

const routes: Routes = [{ path: '', component: FlujoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlujoRoutingModule {}
