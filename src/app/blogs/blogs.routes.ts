import { Routes } from '@angular/router';
import { loginActivateGuard } from '../common/guards/login-activate.guard';
import { blogsResolver } from '../common/resolvers/blogs.resolver';
import { blogLimitActivateGuard } from '../common/guards/blog-limit.guard';

export const blogsRoutes: Routes = [
  {
    path: '',
    title: 'My blogs| Blogging',
    canActivate: [loginActivateGuard],
    resolve: { blogs: blogsResolver},
    loadComponent: () =>
      import('./blogs-page/blogs-page.component').then(
        (m) => m.BlogsPageComponent
      ),
  },
  {
    path: 'new',
    title: 'Create a new Blog | Blogging',
    canActivate: [loginActivateGuard, blogLimitActivateGuard],
    loadComponent: () =>
      import('./create-blog/create-blog.component').then(
        (m) => m.CreateBlogComponent
      ),
  },
];
