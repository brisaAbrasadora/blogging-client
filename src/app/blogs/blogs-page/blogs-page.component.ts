import {
  Component,
  Input,
  Signal,
  computed,
  inject,
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
  imports: [BlogDetailsComponent, BlogListComponent, CommonModule, NgbModule, RouterLink],
  templateUrl: './blogs-page.component.html',
  styleUrl: './blogs-page.component.scss',
})
export class BlogsPageComponent {
  @Input() blogs!: Blog[];
  
  #blogService = inject(BlogService);
  #userService = inject(UsersService);
  #authService: AuthService = inject(AuthService);
  currentUserId: Signal<number> = computed(() => this.#authService.id());

  hasTooltip: boolean[] = [];
}
