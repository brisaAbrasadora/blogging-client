import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { BlogService } from '../../blogs/services/blog.service';
import { AuthService } from '../../auth/services/auth.service';

export const ownBlogActivateGuard: CanActivateFn = (route) => {
  const blogService = inject(BlogService);
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.id() <= 0) {
    return router.createUrlTree(['/my-blogs']);
  }

  return blogService.getBlog(+route.params['id']).pipe(
    map((resp) => {
      if (resp.creator.id === authService.id()) {
        return true;
      } else {
        return router.createUrlTree(['/my-blogs']);
      }
    })
  );
};