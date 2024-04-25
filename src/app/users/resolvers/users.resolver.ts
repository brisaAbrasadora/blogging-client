import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { EMPTY, catchError } from 'rxjs';

import { UsersService } from '../services/users.service';
import { User } from '../interfaces/user.entity';

export const usersResolver: ResolveFn<User> = (route) => {
  console.log('usersResolver...');
  return inject(UsersService)
    .getUser(+route.params['id'])
    .pipe(
      catchError(() => {
        console.log('error at usersResolver');
        inject(Router).navigate(['/users']);
        return EMPTY;
      })
    );
};
