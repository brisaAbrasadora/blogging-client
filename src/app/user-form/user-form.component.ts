import {
  Component,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import { UserRegister } from '../interfaces/entities/user.entity';

@Component({
  selector: 'user-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent {
  newUser!: UserRegister;
  saved = false;

  #usersService = inject(UsersService);
  #router = inject(Router);

  // @Output() addUser = new EventEmitter<User>();

  constructor() {
    this.resetUser();
  }

  canDeactivate(): boolean {
    return this.saved || confirm('Do you want to leave this page? Changes can be lost.');
  }

  registerUser() {
    this.#usersService.registerUser(this.newUser).subscribe({
      next: (u) => {
        console.log(u);
        this.saved = true;
        this.#router.navigate(['/users']);
      },
      error: (error) => {
        console.log(error.error);
      }
    })
  }

  private resetUser() {
    this.newUser = {
      username: '',
      email: '',
      password: '',
    };
  }
}
