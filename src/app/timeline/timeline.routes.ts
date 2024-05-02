import { Routes } from '@angular/router';
import { loginActivateGuard } from '../common/guards/login-activate.guard';

export const profileRoutes: Routes = [
  {
    path: '',
    title: 'Blogging',
    canActivate: [loginActivateGuard],
    loadComponent: () =>
      import('./timeline-page/timeline-page.component').then((m) => m.TimelinePageComponent),
  },
];
