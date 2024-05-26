import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  Signal,
  SimpleChanges,
  computed,
  inject,
} from '@angular/core';
import { Blog, UpdateBlog } from '../../blogs/interfaces/entities';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { invalidBlogTitleValidator } from '../../blogs/validators/invalid-blog-title.validator';
import { CommonModule } from '@angular/common';
import { BlogService } from '../../blogs/services/blog.service';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'settings-tab',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './settings-tab.component.html',
  styleUrl: './settings-tab.component.scss',
})
export class SettingsTabComponent implements OnInit, OnChanges {
  @Input({ required: true }) blog?: Blog;
  @Output() titleUpdated = new EventEmitter<string>();

  #authService: AuthService = inject(AuthService);
  #blogService: BlogService = inject(BlogService);
  currentUserId: Signal<number> = computed(() => this.#authService.id());
  #formBuilder: NonNullableFormBuilder = inject(NonNullableFormBuilder);
  title: FormControl = this.#formBuilder.control('', [
    Validators.required,
    Validators.minLength(5),
    Validators.maxLength(20),
    invalidBlogTitleValidator,
  ]);
  #titles: string[] = [];

  titleForm: FormGroup = this.#formBuilder.group({
    title: this.title,
  });

  constructor() {
    this.resetForms();
    this.#blogService
      .getTitles(this.currentUserId())
      .subscribe({ next: (titles) => (this.#titles = titles) });
  }

  ngOnChanges(changes: SimpleChanges): void {
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
  }

  resetForms(): void {
    this.titleForm.reset();
  }

  updateTitle(): void {
    const update: UpdateBlog = {
      title: this.title.value,
    };

    this.#blogService.updateTitle(this.blog!.id!, update).subscribe({
      next: () => {
        this.blog!.title = this.title.value;
        this.titleForm.reset();
        this.titleUpdated.emit(this.blog!.title);
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
