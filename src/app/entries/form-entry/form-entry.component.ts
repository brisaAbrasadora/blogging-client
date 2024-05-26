import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { invalidBlogTitleValidator } from '../../blogs/validators/invalid-blog-title.validator';
import { entryFormRequiredValidator } from '../validators/entry-form-required.validator';
import { CreateEntry } from '../interfaces/entities/entry.entity';
import { EntryService } from '../services/entry.service';

@Component({
  selector: 'form-entry',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-entry.component.html',
  styleUrl: './form-entry.component.scss',
})
export class FormEntryComponent {
  #formBuilder: NonNullableFormBuilder = inject(NonNullableFormBuilder);

  title: FormControl = this.#formBuilder.control('', [
    Validators.required,
    Validators.minLength(5),
    Validators.maxLength(20),
    invalidBlogTitleValidator,
  ]);
  body: FormControl = this.#formBuilder.control('', [Validators.maxLength(50)]);

  entryForm: FormGroup = this.#formBuilder.group(
    {
      title: this.title,
      body: this.body,
    },
    {
      validators: entryFormRequiredValidator,
    }
  );

  blogId = new URL(window.location.href).pathname.split('/')[2];
  #entryService: EntryService = inject(EntryService);
  #router: Router = inject(Router);
  saved: boolean = false;

  constructor() {
    this.resetForm();
  }

  canDeactivate(): boolean {
    return (
      this.saved ||
      confirm('Do you want to leave this page? Changes can be lost.')
    );
  }

  createEntry() {
    const newEntry: CreateEntry = {
      title: this.title.value,
      body: this.body.value,
      origin: {
        id: +this.blogId,
      },
    };
    this.#entryService.createEntry(newEntry).subscribe({
      next: (resp) => {
        this.saved = resp;
        this.#router.navigate(['/my-blogs']);
      },
      error: (error) => {
        console.log(error.error);
      },
    });
  }

  resetForm() {
    this.entryForm.reset();
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
