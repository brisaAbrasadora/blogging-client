import { Routes } from '@angular/router';
import { UsersPageComponent } from './users-page/users-page.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { numericIdGuard } from './guards/numeric-id.guard';
import { leavePageGuard } from './guards/leave-page.guard';

export const routes: Routes = [
  { path: 'users', title: 'Users | Blogging', component: UsersPageComponent },
  {
    path: 'users/add',
    canDeactivate: [leavePageGuard],
    title: 'New user | Blogging',
    component: UserFormComponent,
  },
  {
    path: 'users/:id',
    canActivate: [numericIdGuard],
    component: UserDetailComponent,
  },
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: '**', redirectTo: '/users' },
];
