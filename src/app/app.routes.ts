import { Routes } from '@angular/router';
import { logoutActivateGuard } from './common/guards/logout-activate.guard';

export const routes: Routes = [
  {
    path: 'welcome',
    title: 'Welcome | Blogging',
    canActivate: [logoutActivateGuard],
    loadComponent: () =>
      import('./welcome/welcome.component').then((m) => m.WelcomeComponent),
  },
  {
    path: 'timeline',
    loadChildren: () =>
      import('./timeline/timeline.routes').then((m) => m.profileRoutes),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./users/users.routes').then((m) => m.usersRoutes),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then((m) => m.usersRoutes),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./profile/profile.routes').then((m) => m.profileRoutes),
  },
  {
    path: 'blogs',
    loadChildren: () =>
      import('./blogs/blogs.routes').then((m) => m.blogsRoutes),
  },
  { path: '', redirectTo: '/timeline', pathMatch: 'full' },
  { path: '**', redirectTo: '/timeline' },
];
