import { Routes } from '@angular/router';
import { numericIdGuard } from '../common/guards/numeric-id.guard';
import { usersResolver } from './resolvers/users.resolver';

export const usersRoutes: Routes = [
  {
    path: '',
    title: 'Users | Blogging',
    loadComponent: () =>
      import('./users-page/users-page.component').then(
        (m) => m.UsersPageComponent
      ),
  },
  {
    path: ':id',
    canActivate: [numericIdGuard],
    resolve: {
      user: usersResolver,
    },
    loadComponent: () =>
      import('./user-detail/user-detail.component').then(
        (m) => m.UserDetailComponent
      ),
  },
];
