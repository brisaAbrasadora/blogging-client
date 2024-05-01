import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { formRequiredValidator } from '../../common/validators';
import { Login } from '../interfaces/dto';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  #formBuilder: NonNullableFormBuilder = inject(NonNullableFormBuilder);

  username: FormControl = this.#formBuilder.control('', [Validators.required]);
  // email: FormControl = this.#formBuilder.control('', [
  //   Validators.required,
  //   Validators.email,
  // ]);
  password: FormControl = this.#formBuilder.control('', [Validators.required]);

  loginForm: FormGroup = this.#formBuilder.group(
    {
      username: this.username,
      // email: this.email,
      password: this.password,
    },
    {
      validators: formRequiredValidator,
    }
  );

  #authService: AuthService = inject(AuthService);
  #router: Router = inject(Router);

  constructor() {
    this.resetForm();
  }

  loginUser() {
    const user: Login = {
      username: this.username.value,
      password: this.password.value,
    };
    this.#authService.loginUser(user).subscribe({
      next: () => {
        this.#router.navigate(['/users']);
      },
      error: (error) => {
        console.log(error.error);
      },
    });
  }

  resetForm() {
    this.loginForm.reset();
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
