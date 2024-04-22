import { Component, Inject, LOCALE_ID } from '@angular/core';
import { formatDate } from '@angular/common';

import { User } from '../interfaces';
import { UserFilterPipe } from '../pipes/user-filter.pipe';
import { UserItemComponent } from '../user-item/user-item.component';
import { UserFormComponent } from '../user-form/user-form.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'users-page',
  standalone: true,
  imports: [FormsModule, UserFilterPipe, UserItemComponent, UserFormComponent],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.css',
})
export class UsersPageComponent {
  constructor(@Inject(LOCALE_ID) private locale: string) {}

  title: string = 'Users registered in Blogging';
  headers = {
    id: 'id',
    username: 'Username',
    email: 'Email',
    memberSince: 'Member since',
    delete: 'Delete',
  };
  search: string = '';

  users: User[] = [
    {
      id: 1,
      username: 'Brisa',
      email: 'brisabrasadora@gmail.com',
      memberSince: formatDate(Date.now(), 'yyyy/MM/dd', this.locale),
    },
  ];

  onAddUser(user: User): void {
    const IS_ARRAY_EMPTY: boolean = this.users.length === 0;
    user.id = IS_ARRAY_EMPTY 
      ? 1
      : Math.max(...this.users.map((u) => u.id!)) + 1;
    this.users = [...this.users, user];
  }

  onDeleteItem(itemId: number) {
    this.users = this.users.filter(u => u.id !== itemId);
  }
}
