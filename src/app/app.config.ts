import { ApplicationConfig } from '@angular/core';
import {
  PreloadAllModules,
  provideRouter,
  withComponentInputBinding,
  withPreloading,
} from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { baseUrlInterceptor } from './common/interceptors/base-url.interceptor';
import { authInterceptor } from './auth/interceptors/auth.interceptor';
import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withComponentInputBinding(),
      withPreloading(PreloadAllModules)
    ),
    provideHttpClient(withInterceptors([baseUrlInterceptor, authInterceptor])),
    {provide: DATE_PIPE_DEFAULT_OPTIONS, useValue: {dateFormat: 'medium', timezone: '+0400'}}
  ],
};
