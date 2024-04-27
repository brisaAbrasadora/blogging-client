import {
  Injectable,
  Signal,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  AccessTokenResponse,
  EmailResponse,
  UserResponse,
  UsernameResponse,
  UsersResponse,
} from '../interfaces/responses';
import { Observable, map } from 'rxjs';
import { User } from '../interfaces/user.entity';
import { Login } from '../../auth/interfaces';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  #usersUrl = 'users';
  #http = inject(HttpClient);
  #logged: WritableSignal<boolean> = signal(false);

  constructor() {}

  get logged(): Signal<boolean> {
    return this.#logged.asReadonly();
  }

  getUser(id: number): Observable<User> {
    return this.#http.get<UserResponse>(`${this.#usersUrl}/${id}`).pipe(
      map((resp: UserResponse) => {
        return resp.user;
      })
    );
  }

  getUsers(): Observable<User[]> {
    return this.#http.get<UsersResponse>(`${this.#usersUrl}`).pipe(
      map((resp: UsersResponse) => {
        return resp.users;
      })
    );
  }

  getEmails(): Observable<string[]> {
    return this.#http.get<EmailResponse>(`${this.#usersUrl}/emails`).pipe(
      map((resp: EmailResponse) => {
        return resp.emails;
      })
    );
  }

  getUsernames(): Observable<string[]> {
    return this.#http.get<UsernameResponse>(`${this.#usersUrl}/usernames`).pipe(
      map((resp: UsernameResponse) => {
        return resp.usernames;
      })
    );
  }

  registerUser(newUser: User): Observable<User> {
    return this.#http
      .post<UserResponse>(`${this.#usersUrl}`, newUser)
      .pipe(map((resp: UserResponse) => resp.user));
  }

  loginUser(user: Login): Observable<string> {
    return this.#http
      .post<AccessTokenResponse>(`auth/login`, user)
      .pipe(map((resp: AccessTokenResponse) => resp.accessToken));
  }

  deleteUser(id: number): Observable<void> {
    return this.#http.delete<void>(`${this.#usersUrl}/${id}`);
  }
}
