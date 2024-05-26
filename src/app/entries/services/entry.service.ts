import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

import { CreateEntry } from '../interfaces/entities/entry.entity';

@Injectable({
  providedIn: 'root'
})
export class EntryService {
  #entriesUrl = 'entries';
  #http = inject(HttpClient);

  constructor() { }

  createEntry(newEntry: CreateEntry): Observable<boolean> {
    return this.#http
      .post<void>(`${this.#entriesUrl}`, newEntry)
      .pipe(map(() => true));
  }

  deleteEntry(id: number): Observable<void> {
    return this.#http
      .delete<void>(`${this.#entriesUrl}/${id}`);
  }
}
