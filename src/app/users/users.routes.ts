import { Routes } from '@angular/router';
import { leavePageGuard } from '../common/guards/leave-page.guard';
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
    path: 'add',
    canDeactivate: [leavePageGuard],
    title: 'New user | Blogging',
    loadComponent: () =>
      import('./user-form/user-form.component').then(
        (m) => m.UserFormComponent
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
