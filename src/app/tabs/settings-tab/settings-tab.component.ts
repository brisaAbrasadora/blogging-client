import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  Signal,
  computed,
  inject,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

import { invalidBlogTitleValidator } from '../../blogs/validators/invalid-blog-title.validator';
import { BlogService } from '../../blogs/services/blog.service';
import { AuthService } from '../../auth/services/auth.service';
import { Blog, BlogToUpdateDTO } from '../../blogs/interfaces/entities';
import { BlogToUpdate } from '../../common/interfaces/blog-to-update.interface';

@Component({
  selector: 'settings-tab',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './settings-tab.component.html',
  styleUrl: './settings-tab.component.scss',
})
export class SettingsTabComponent implements OnInit, OnChanges {
  @Input({ required: true }) blog?: Blog;
  @Output() titleUpdated = new EventEmitter<BlogToUpdate>();
  @Output() descriptionUpdated = new EventEmitter<string>();
  @Output() blogDeleted = new EventEmitter<number>();

  #formBuilder: NonNullableFormBuilder = inject(NonNullableFormBuilder);
  title: FormControl = this.#formBuilder.control('', [
    Validators.required,
    Validators.minLength(5),
    Validators.maxLength(20),
    invalidBlogTitleValidator,
  ]);
  description: FormControl = this.#formBuilder.control('', [
    Validators.maxLength(50),
  ]);
  #titles: string[] = [];

  titleForm: FormGroup = this.#formBuilder.group({
    title: this.title,
  });
  descriptionForm: FormGroup = this.#formBuilder.group({
    description: this.description,
  });

  #authService: AuthService = inject(AuthService);
  #blogService: BlogService = inject(BlogService);
  currentUserId: Signal<number> = computed(() => this.#authService.id());

  constructor() {
    this.#blogService
      .getTitles(this.currentUserId())
      .subscribe({ next: (titles) => (this.#titles = titles) });
  }

  deleteBlog(id: number): void {
    this.#blogService.deleteBlog(id).subscribe({
      next: () => {
        this.blogDeleted.emit(id);
      },
    });
  }

  ngOnChanges(): void {
    this.resetForms();
  }

  ngOnInit(): void {
    this.title.valueChanges.subscribe((title) => {
      if (this.#titles.includes(title.toLowerCase())) {
        this.title.setErrors({
          notUnique: true,
        });
      }
    });
    this.title.setValue(this.blog!.title);
  }

  resetForms(): void {
    this.title.reset();
    this.description.reset();
    this.title.setValue(this.blog!.title);
    this.description.setValue(this.blog!.description);
  }

  updateDescription(fromDelete: boolean): void {
    const update: BlogToUpdateDTO = {
      description: fromDelete ? '' : this.description.value,
    };

    this.#blogService.updateBlog(this.blog!.id!, update).subscribe({
      next: () => {
        this.blog!.description = update.description!;
        this.resetForms();
        this.descriptionUpdated.emit(this.blog!.description);
      },
      error: (error) => {
        console.log(error.error);
      },
    });
  }

  updateTitle(): void {
    const update: BlogToUpdateDTO = {
      title: this.title.value,
    };

    this.#blogService.updateBlog(this.blog!.id!, update).subscribe({
      next: () => {
        this.blog!.title = update.title!;
        this.resetForms();
        this.titleUpdated.emit({ id: this.blog!.id!, title: this.blog!.title });
      },
      error: (error) => {
        console.log(error.error);
      },
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
}
