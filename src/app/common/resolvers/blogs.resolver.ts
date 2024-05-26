import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { EMPTY, catchError } from 'rxjs';

import { BlogService } from '../../blogs/services/blog.service';
import { Blog } from '../../blogs/interfaces/entities';

export const blogsResolver: ResolveFn<Blog[]> = (route) => {
    return inject(BlogService)
    .getBlogs(+route.params['id'])
    .pipe(
      catchError(() => {
        console.log('error at usersResolver');
        // inject(Router).navigate(['/users']);
        return EMPTY;
      })
    );
};
