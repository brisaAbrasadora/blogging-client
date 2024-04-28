import { HttpClient } from '@angular/common/http';
import {
  Injectable,
  Signal,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { User } from '../../users/interfaces/user.entity';
import { Observable, catchError, map, of } from 'rxjs';
import {
  AccessTokenResponse,
  UserResponse,
} from '../../users/interfaces/responses';
import { Login } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  #authUrl = 'auth';
  #http = inject(HttpClient);
  #logged: WritableSignal<boolean> = signal(false);

  constructor() {}

  isLogged(): Observable<boolean> {
    if (this.logged()) {
      return of(true);
    } else {
      if (localStorage.getItem('token')) {
        return this.#http
          .get<AccessTokenResponse>(`${this.#authUrl}/validate`)
          .pipe(
            map(() => {
              this.#logged.set(true);
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

  registerUser(newUser: User): Observable<User> {
    return this.#http
      .post<UserResponse>(`${this.#authUrl}/register`, newUser)
      .pipe(map((resp: UserResponse) => resp.user));
  }

  loginUser(user: Login): Observable<void> {
    return this.#http
      .post<AccessTokenResponse>(`${this.#authUrl}/login`, user)
      .pipe(
        map((resp: AccessTokenResponse) => {
          localStorage.setItem('token', resp.accessToken);
          this.#logged.set(true);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.#logged.set(false);
  }
}
