import { CommonModule } from '@angular/common';
import { Component, OnInit, Signal, computed, inject } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { blogFormRequiredValidator } from '../validators/blog-form-required.validator';
import { invalidBlogTitleValidator } from '../validators/invalid-blog-title.validator';
import { AuthService } from '../../auth/services/auth.service';
import { BlogService } from '../services/blog.service';
import { CreateBlog } from '../interfaces/entities/blog.entity';

@Component({
  selector: 'create-blog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './create-blog.component.html',
  styleUrl: './create-blog.component.scss'
})
export class CreateBlogComponent implements OnInit {
  #formBuilder: NonNullableFormBuilder = inject(NonNullableFormBuilder);

  // TODO add images or something dude
  currentUserId: Signal<number> = computed(() => this.#authService.id());
  title: FormControl = this.#formBuilder.control('', [
    Validators.required,
    Validators.minLength(5),
    Validators.maxLength(20),
    invalidBlogTitleValidator,
  ]);
  description: FormControl = this.#formBuilder.control('', [
    Validators.maxLength(50),
  ]);

  blogForm: FormGroup = this.#formBuilder.group(
    {
      title: this.title,
      description: this.description,
    },
    {
      validators: blogFormRequiredValidator,
    }
  );

  #authService: AuthService = inject(AuthService);
  #blogService: BlogService = inject(BlogService);
  #router: Router = inject(Router);
  saved: boolean = false;
  #titles: string[] = [];

  constructor() {
    this.resetForm();
    this.#blogService.getTitles(this.currentUserId()).subscribe({
      next: (titles) => {
        this.#titles = titles;
      },
    });
  }

  canDeactivate(): boolean {
    return (
      this.saved ||
      confirm('Do you want to leave this page? Changes can be lost.')
    );
  }

  createBlog() {
    const newBlog: CreateBlog = {
      title: this.title.value,
      description: this.description.value,
      creator: {
        id: this.currentUserId()
      }
    };
    this.#blogService.createBlog(newBlog).subscribe({
      next: (resp) => {
        this.saved = resp;
        this.#router.navigate(['/my-blogs']);
      },
      error: (error) => {
        console.log(error.error);
      },
    });
  }
  
  ngOnInit(): void {
    this.title.valueChanges.subscribe((title) => {
      if (this.#titles.includes(title.toLowerCase())) {
        this.title.setErrors({
          notUnique: true,
        });
      }
    });
  }
  
  resetForm() {
    this.blogForm.reset();
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
