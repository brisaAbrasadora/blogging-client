import { Component, Inject, LOCALE_ID } from '@angular/core';
import { User } from '../interfaces';
import { FormsModule } from '@angular/forms';
import { formatDate } from '@angular/common';

@Component({
  selector: 'users-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.css',
})
export class UsersPageComponent {
  constructor(@Inject(LOCALE_ID) private locale: string) {
    this.resetUser();
  }

  title = 'Users registered in Blogging';
  headers = { id: 'id', username: 'Username', email: 'Email', memberSince: 'Member since' };

  newUser!: User;
  users: User[] = [
    {
      id: 1,
      username: 'Brisa',
      email: 'brisabrasadora@gmail.com',
      memberSince: formatDate(Date.now(), 'yyyy/MM/dd', this.locale),
    },
  ];

  registerUser() {
    this.newUser.id = Math.max(...this.users.map(u => u.id!)) + 1;
    this.newUser.memberSince = formatDate(Date.now(), 'yyyy/MM/dd', this.locale);
    this.users.push(this.newUser);
    this.resetUser();
  }

  private resetUser() {
    this.newUser = {
      id: 0,
      username: '',
      email: '',
      memberSince: '',
      password: '',
    }
  }
}
