import {
  Component,
  Input,
  OnChanges,
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
export class BlogsPageComponent implements OnChanges {
  @Input() blogs!: Blog[];

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

  onTitleUpdated(title: string) {
    this.blogs[this.blogSelectedIndex].title = title;
  }
}
