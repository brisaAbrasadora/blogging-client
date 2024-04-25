import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const numericIdGuard: CanActivateFn = (route) => {
  console.log('numericIdGuard...');
  const id: number = +route.params['id'];
  if (isNaN(id) || id < 1) {
    console.log('error at numericIdGuard');
    return inject(Router).createUrlTree(['/']);
  }
  return true;
};
