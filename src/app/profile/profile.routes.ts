import { Routes } from '@angular/router';
import { loginActivateGuard } from '../common/guards/login-activate.guard';
import { usersResolver } from '../common/resolvers/users.resolver';
import { numericIdGuard } from '../common/guards/numeric-id.guard';

export const profileRoutes: Routes = [
  {
    path: '',
    title: 'My profile | Blogging',
    canActivate: [loginActivateGuard],
    resolve: { user: usersResolver },
    loadComponent: () =>
      import('./profile-page/profile-page.component').then((m) => m.ProfilePageComponent),
  },
  {
    path: ':id',
    canActivate: [numericIdGuard, loginActivateGuard],
    resolve: {
      user: usersResolver,
    },
    loadComponent: () =>
      import('./profile-page/profile-page.component').then((m) => m.ProfilePageComponent),
  },
];
