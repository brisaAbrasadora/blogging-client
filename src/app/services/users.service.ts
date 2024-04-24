import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../interfaces/entities';
import { UserResponse, UsersResponse } from '../interfaces/responses';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  #usersUrl = 'users';
  #http = inject(HttpClient);

  constructor() {}

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
}
