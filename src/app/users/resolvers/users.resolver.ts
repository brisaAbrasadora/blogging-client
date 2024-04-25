import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { EMPTY, catchError } from 'rxjs';

import { UsersService } from '../services/users.service';
import { User } from '../interfaces/user.entity';

export const usersResolver: ResolveFn<User> = (route) => {
  return inject(UsersService)
    .getUser(+route.params['id'])
    .pipe(
      catchError(() => {
        inject(Router).navigate(['/users']);
        return EMPTY;
      })
    );
};
