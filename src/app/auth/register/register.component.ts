import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UsersService } from '../../users/services/users.service';
import { Router } from '@angular/router';
import { UserRegister } from '../../users/interfaces/user.entity';
import {
  invalidPasswordValidator,
  invalidUsernameValidator,
  userFormRequiredValidator,
} from '../../common/validators';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  #formBuilder: NonNullableFormBuilder = inject(NonNullableFormBuilder);

  username: FormControl = this.#formBuilder.control('', [
    Validators.required,
    Validators.minLength(5),
    invalidUsernameValidator,
  ]);
  email: FormControl = this.#formBuilder.control('', [
    Validators.required,
    Validators.email,
  ]);
  password: FormControl = this.#formBuilder.control('', [
    Validators.required,
    Validators.minLength(8),
    invalidPasswordValidator,
  ]);

  userForm: FormGroup = this.#formBuilder.group(
    {
      username: this.username,
      email: this.email,
      password: this.password,
    },
    {
      validators: userFormRequiredValidator,
    }
  );

  saved: boolean = false;

  #usersService: UsersService = inject(UsersService);
  #authService: AuthService = inject(AuthService);
  #router: Router = inject(Router);
  #emails: string[] = [];
  #usernames: string[] = [];

  constructor() {
    this.resetForm();
    this.#usersService.getEmails().subscribe({
      next: (emails) => {
        this.#emails = emails;
      },
    });
    this.#usersService.getUsernames().subscribe({
      next: (usernames) => {
        this.#usernames = usernames;
      },
    });
  }

  canDeactivate(): boolean {
    return (
      this.saved ||
      confirm('Do you want to leave this page? Changes can be lost.')
    );
  }

  ngOnInit(): void {
    this.email.valueChanges.subscribe((email) => {
      if (this.#emails.includes(email.toLowerCase())) {
        this.email.setErrors({
          notUnique: true,
        });
      }
    });
    this.username.valueChanges.subscribe((username) => {
      if (this.#usernames.includes(username.toLowerCase())) {
        this.username.setErrors({
          notUnique: true,
        });
      }
    });
  }

  registerUser() {
    const newUser: UserRegister = {
      username: this.username.value,
      email: this.email.value.toLowerCase(),
      password: this.password.value,
    };
    this.#authService.registerUser(newUser).subscribe({
      next: () => {
        this.saved = true;
        this.#router.navigate(['/users']);
      },
      error: (error) => {
        console.log(error.error);
      },
    });
  }

  resetForm() {
    this.userForm.reset();
  }

  validClasses(
    formControl: FormControl,
    validClass: string,
    errorClass: string
  ) {
    return {
      [validClass]: formControl.touched && formControl.valid,
      [errorClass]: formControl.touched && formControl.invalid,
    };
  }
}
