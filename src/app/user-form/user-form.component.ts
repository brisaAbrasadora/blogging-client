import { Component, EventEmitter, Inject, LOCALE_ID, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { User } from '../interfaces/entities';
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

  @Output() addUser = new EventEmitter<User>();
  
  constructor(@Inject(LOCALE_ID) private locale: string) {
    this.resetUser();
  }

  registerUser() {
    this.newUser.memberSince = new Date(Date.now()).toString();
    this.addUser.emit(this.newUser);
    this.resetUser();
  }

  private resetUser() {
    this.newUser = {
      id: 0,
      username: '',
      email: '',
      password: '',
      memberSince: new Date().toString(),
      updatedAt: new Date().toString(),
    }
  }
}
