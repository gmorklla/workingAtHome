import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RuleComponent} from './rule.component';

const routes: Routes = [{ path: '', component: RuleComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RuleRoutingModule { }
