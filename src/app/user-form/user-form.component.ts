import { Component, EventEmitter, Inject, LOCALE_ID, Output } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';

import { User } from '../interfaces';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'user-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {
  newUser!: User;

  @Output()
  add = new EventEmitter<User>();
  
  constructor(@Inject(LOCALE_ID) private locale: string) {
    this.resetUser();
  }

  registerUser() {
    this.newUser.memberSince = formatDate(Date.now(), 'yyyy/MM/dd', this.locale);
    this.add.emit(this.newUser);
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
