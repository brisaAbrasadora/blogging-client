import { Routes } from '@angular/router';
import { leavePageGuard } from '../common/guards/leave-page.guard';
import { logoutActivateGuard } from '../common/guards/logout-activate.guard';

export const usersRoutes: Routes = [
  {
    path: 'register',
    title: 'Create a new account | Blogging',
    canActivate: [logoutActivateGuard],
    canDeactivate: [leavePageGuard],
    loadComponent: () =>
      import('./register/register.component').then((m) => m.RegisterComponent),
  },
  {
    path: 'login',
    title: 'Login | Blogging',
    canActivate: [logoutActivateGuard],
    loadComponent: () =>
      import('./login/login.component').then((m) => m.LoginComponent),
  },
];
