import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { EMPTY, catchError } from 'rxjs';

import { BlogService } from '../../blogs/services/blog.service';
import { Blog } from '../../blogs/interfaces/entities';

export const blogsResolver: ResolveFn<Blog[]> = (route) => {
    return inject(BlogService)
    .getBlogsByUser(+route.params['id'])
    .pipe(
      catchError(() => {
        return EMPTY;
      })
    );
};
