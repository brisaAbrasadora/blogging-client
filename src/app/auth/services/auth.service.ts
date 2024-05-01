import { HttpClient } from '@angular/common/http';
import {
  Injectable,
  Signal,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';

import {
  UserResponse,
} from '../../users/interfaces/responses';
import { Login } from '../interfaces/dto';
import { User } from '../../users/interfaces/user.entity';
import { AccessTokenResponse, ValidateResponse } from '../interfaces/responses';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  #authUrl = 'auth';
  #http = inject(HttpClient);
  #logged: WritableSignal<boolean> = signal(false);
  #id: WritableSignal<number> = signal(0);
  #username: WritableSignal<string> = signal('');

  constructor() {}

  isLogged(): Observable<boolean> {
    if (this.logged()) {
      return of(true);
    } else {
      if (localStorage.getItem('token')) {
        return this.#http
          .get<ValidateResponse>(`${this.#authUrl}/validate`)
          .pipe(
            map(({ id, username }: ValidateResponse) => {
              this.#logged.set(true);
              this.#username.set(username);
              this.#id.set(id);
              return true;
            }),
            catchError(() => {
              localStorage.removeItem('token');
              return of(false);
            })
          );
      }
      return of(false);
    }
  }

  get logged(): Signal<boolean> {
    return this.#logged.asReadonly();
  }

  get id(): Signal<number> {
    return this.#id.asReadonly();
  }

  get username(): Signal<string> {
    return this.#username.asReadonly();
  }

  registerUser(newUser: User): Observable<User> {
    return this.#http
      .post<UserResponse>(`${this.#authUrl}/register`, newUser)
      .pipe(map((resp: UserResponse) => resp.user));
  }

  loginUser(user: Login): Observable<void> {
    return this.#http
      .post<AccessTokenResponse>(`${this.#authUrl}/login`, user)
      .pipe(
        map(({ id, username, accessToken }: AccessTokenResponse) => {
          localStorage.setItem('token', accessToken!);
          this.#logged.set(true);
          this.#username.set(username);
          this.#id.set(id);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.#logged.set(false);
  }
}
