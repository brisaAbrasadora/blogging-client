import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../interfaces/entities';
import { UsersResponse } from '../interfaces/responses';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  #usersUrl = 'http://localhost:3000/users';
  #http = inject(HttpClient);

  constructor() {}

  getUsers(): Observable<User[]> {
    return this.#http.get<UsersResponse>(`${this.#usersUrl}`).pipe(
      map((resp) => {
        return resp.users;
      })
    );
  }
}
