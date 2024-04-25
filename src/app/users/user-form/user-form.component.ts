import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import { UserRegister } from '../interfaces/user.entity';
import { formRequiredValidator } from '../../common/validators/form-required.validator';
import { emailExistsValidator } from '../../common/validators/email-exists.validator';

@Component({
  selector: 'user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent implements OnInit {
  #formBuilder: NonNullableFormBuilder = inject(NonNullableFormBuilder);

  username: FormControl = this.#formBuilder.control('', [
    Validators.required,
    Validators.minLength(5),
  ]);
  email: FormControl = this.#formBuilder.control('', [
    Validators.required,
    Validators.email,
  ]);
  password: FormControl = this.#formBuilder.control('', [
    Validators.required,
    Validators.minLength(4),
  ]);

  userForm: FormGroup = this.#formBuilder.group(
    {
      username: this.username,
      email: this.email,
      password: this.password,
    },
    {
      validators: formRequiredValidator,
    }
  );

  saved: boolean = false;

  #usersService: UsersService = inject(UsersService);
  #router: Router = inject(Router);
  #emails: string[] = [];

  constructor() {
    this.resetForm();
    this.#usersService.getUsers().subscribe({
      next: (users) => {
        this.#emails = users.map((u) => u.email);
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
      if (this.#emails.includes(email)) {
        this.email.setErrors({
          notUnique: true,
        });
      }
    });
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

  registerUser() {
    const newUser: UserRegister = {
      ...this.userForm.getRawValue(),
    };
    this.#usersService.registerUser(newUser).subscribe({
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
}
