import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
  {
    path: 'login',
    loadChildren: './login/login.module#LoginModule'
  },
  {
    path: 'campaigns',
    loadChildren: './campaign/campaign.module#CampaignModule'
  },
  {
    path: 'flows',
    loadChildren: './flow/flow.module#FlowModule'
  },
  {
    path: 'flujo',
    loadChildren: './flujo/flujo.module#FlujoModule'
  },
  {
    path: 'layout/design/:designId/window/:windowId',
    loadChildren: './editor/editor.module#EditorModule'
  },
  {
    path: 'layout/config/:designId/window/:windowId',
    loadChildren: './rule/rule.module#RuleModule'
  },
  // Redirect all others to login
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  { path: '**', redirectTo: '/login' }
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(appRoutes, {
  useHash: true
});


/*
export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(appRoutes);

Para cuando hacemos el ng build
export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(appRoutes, {useHash: true});
*/
