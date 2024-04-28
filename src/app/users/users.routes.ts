import { Routes } from '@angular/router';
import { numericIdGuard } from '../common/guards/numeric-id.guard';
import { usersResolver } from '../common/resolvers/users.resolver';
import { loginActivateGuard } from '../common/guards/login-activate.guard';

export const usersRoutes: Routes = [
  {
    path: '',
    title: 'Users | Blogging',
    canActivate: [loginActivateGuard],
    loadComponent: () =>
      import('./users-page/users-page.component').then(
        (m) => m.UsersPageComponent
      ),
  },
  {
    path: ':id',
    canActivate: [numericIdGuard, loginActivateGuard],
    resolve: {
      user: usersResolver,
    },
    loadComponent: () =>
      import('./user-detail/user-detail.component').then(
        (m) => m.UserDetailComponent
      ),
  },
];
