import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FlowListComponent} from './views/flow-list/flow-list.component';
import {FlowCreateComponent} from './views/flow-create/flow-create.component';
import {FlowEditComponent} from './views/flow-edit/flow-edit.component';

const routes: Routes = [
  {
    path: '',
    component: FlowListComponent
  },
  {
    path: 'create',
    component: FlowCreateComponent
  },
  {
    path: ':flowId/edit', component: FlowEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlowRoutingModule { }
