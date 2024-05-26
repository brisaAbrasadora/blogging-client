import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { BlogService } from '../../blogs/services/blog.service';

export const blogLimitActivateGuard: CanActivateFn = (route) => {
  const blogService = inject(BlogService);
  const router = inject(Router);

  return blogService.getBlogs(+route.params['id']).pipe(
    map((resp) => {
      if (resp.length < 5) {
        return true;
      } else {
        return router.createUrlTree(['/blogs']);
      }
    })
  );
};