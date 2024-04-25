import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { UserFilterPipe } from '../pipes/user-filter.pipe';
import { UserItemComponent } from '../user-item/user-item.component';
import { UserFormComponent } from '../user-form/user-form.component';
import { UsersService } from '../services/users.service';
import { User } from '../interfaces/user.entity';

@Component({
  selector: 'users-page',
  standalone: true,
  imports: [FormsModule, UserFilterPipe, UserItemComponent, UserFormComponent],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.css',
})
export class UsersPageComponent implements OnInit {
  #usersService = inject(UsersService);

  constructor() {}

  title: string = 'Users registered in Blogging';
  headers = {
    id: 'id',
    username: 'Username',
    email: 'Email',
    memberSince: 'Member since',
    delete: 'Delete',
  };
  search: string = '';

  users: User[] = [];

  ngOnInit(): void {
    this.#usersService
      .getUsers()
      .subscribe({
        next: (users) => {
          this.users = users;
        },
        error: (error) => console.log(error),
      }).add(() => console.log('Users loaded!'));
  }

  onAddUser(user: User): void {
    const IS_ARRAY_EMPTY: boolean = this.users.length === 0;
    user.id = IS_ARRAY_EMPTY
      ? 1
      : Math.max(...this.users.map((u) => u.id!)) + 1;
    this.users = [...this.users, user];
  }

  onDeleteItem(deleted: boolean): void {
    // this.users = this.users.filter((u) => u.id !== itemId);
    console.log(deleted);
  }
}
