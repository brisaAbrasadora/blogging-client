import { Injectable, Signal, WritableSignal, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UserResponse, UsersResponse } from '../interfaces/responses';
import { Observable, map } from 'rxjs';
import { User } from '../interfaces/user.entity';

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
  
  getUsers(): Observable<User[]> {
    return this.#http.get<UsersResponse>(`${this.#usersUrl}`).pipe(
      map((resp) => {
        return resp.users;
      })
    );
  }

  getUser(id: number): Observable<User> {
    return this.#http.get<UserResponse>(`${this.#usersUrl}/${id}`).pipe(
      map((resp) => {
        return resp.user;
      })
    );
  }

  registerUser(newUser: User): Observable<User> {
    return this.#http
      .post<UserResponse>(`${this.#usersUrl}`, newUser)
      .pipe(map((resp) => resp.user));
  }

  deleteUser(id: number): Observable<void> {
    return this.#http
      .delete<void>(`${this.#usersUrl}/${id}`);
  }
}
