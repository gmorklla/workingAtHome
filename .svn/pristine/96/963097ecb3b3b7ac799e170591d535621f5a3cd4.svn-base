import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleGuardService } from './shared/services/role-guard.service';

const appRoutes: Routes = [
  {
    path: 'login',
    loadChildren: './login/login.module#LoginModule'
  },
  {
    path: 'dashboard',
    loadChildren: './dashboard/dashboard.module#DashboardModule',
    canActivate: [RoleGuardService],
    data: { role: 'user' }
  },
  {
    path: 'chat',
    loadChildren: './chat/chat.module#ChatModule',
    canActivate: [RoleGuardService],
    data: { role: 'user' }
  },
  {
    path: 'api',
    loadChildren: './api-test/api-test.module#ApiTestModule',
    canActivate: [RoleGuardService],
    data: { role: 'user' }
  },
  {
    path: 'reports',
    loadChildren: './reports/reports.module#ReportsModule',
    canActivate: [RoleGuardService],
    data: { role: 'admin' }
  },
  {
    path: 'users',
    loadChildren: './users/users.module#UsersModule',
    canActivate: [RoleGuardService],
    data: { role: 'admin' }
  },
  // Redirect all others to login
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  { path: '**', redirectTo: '/login' }
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(appRoutes);
