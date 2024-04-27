import { Routes } from '@angular/router';
import { leavePageGuard } from '../common/guards/leave-page.guard';

export const usersRoutes: Routes = [
  {
    path: 'register',
    canDeactivate: [leavePageGuard],
    title: 'Register | Blogging',
    loadComponent: () =>
      import('./register/register.component').then((m) => m.RegisterComponent),
  },
  {
    path: 'login',
    title: 'Login | Blogging',
    loadComponent: () =>
      import('./login/login.component').then((m) => m.LoginComponent),
  },
];
