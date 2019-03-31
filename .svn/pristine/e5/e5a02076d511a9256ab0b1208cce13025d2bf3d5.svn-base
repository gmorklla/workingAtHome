import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
  {
    path: 'render',
    loadChildren: './render/render.module#RenderModule'
  },
  {
    path: '',
    redirectTo: '/render',
    pathMatch: 'full'
  },
  { path: '**', redirectTo: '/render' }
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(appRoutes);
