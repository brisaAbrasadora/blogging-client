import {
  Component,
  Input,
  OnChanges,
  OnInit,
  Signal,
  SimpleChanges,
  WritableSignal,
  computed,
  inject,
  signal,
} from '@angular/core';
import { BlogService } from '../services/blog.service';
import { UsersService } from '../../users/services/users.service';
import { Blog } from '../interfaces/entities';
import { AuthService } from '../../auth/services/auth.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BlogListComponent } from '../blog-list/blog-list.component';
import { BlogDetailsComponent } from '../blog-details/blog-details.component';
import { BlogToUpdate } from '../../common/interfaces/blog-to-update.interface';

@Component({
  selector: 'blogs-page',
  standalone: true,
  imports: [
    BlogDetailsComponent,
    BlogListComponent,
    CommonModule,
    NgbModule,
    RouterLink,
  ],
  templateUrl: './blogs-page.component.html',
  styleUrl: './blogs-page.component.scss',
})
export class BlogsPageComponent implements OnInit, OnChanges {
  @Input() blogs!: Blog[];

  blogSignal: WritableSignal<Blog[]> = signal(this.blogs!);
  blogSelected: WritableSignal<Blog | undefined> = signal(undefined);
  blogSelectedIndex: number = -1;

  #blogService = inject(BlogService);
  #userService = inject(UsersService);
  #authService: AuthService = inject(AuthService);
  currentUserId: Signal<number> = computed(() => this.#authService.id());

  hasTooltip: boolean[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  ngOnInit(): void {
      this.blogSignal.set(this.blogs!);
  }

  onBlogDeleted(id: number) {
    console.log(id);
    this.blogSignal.update((blogs) => {
      console.log(blogs);
      return blogs.filter((b) => {
        console.log(b);
        return b.id !== id;
      });
    });
    this.blogs.filter((b) => {
      console.log(b);
      return b.id !== id;
    });
  }

  onBlogSelected({ ...args }): void {
    this.#blogService.getBlog(+args['blogId']).subscribe({
      next: (blog) => {
        this.blogSelected.set(blog);
        this.blogSelectedIndex = args['i'];
      },
      error: (error) => {
        console.log(error.error);
      },
    });
  }

  onCloseDetails(): void {
    this.blogSelectedIndex = -1;
    this.blogSelected.set(undefined);
  }

  onDescriptionUpdated(description: string) {
    this.blogs[this.blogSelectedIndex].description = description;
  }

  onTitleUpdated({id, title}: BlogToUpdate) {
    this.blogSignal.update((blogs) => {
      console.log(blogs);
      return blogs.map((b) => {
        console.log(b);
        if (b.id === id) {
          b.title = title!;
        }
        console.log(b);
        return b;
      });
    });
  }
}
