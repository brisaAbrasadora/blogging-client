import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { EMPTY, catchError } from 'rxjs';

import { UsersService } from '../../users/services/users.service';
import { User } from '../../users/interfaces/user.entity';

export const usersResolver: ResolveFn<User> = (route) => {
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
