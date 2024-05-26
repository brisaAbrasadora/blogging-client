import { Component, EventEmitter, Input, OnInit, Output, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Blog } from '../interfaces/entities';
import { CommonModule } from '@angular/common';
import { BlogService } from '../services/blog.service';

@Component({
  selector: 'blog-list',
  standalone: true,
  imports: [CommonModule, NgbModule, RouterLink],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.scss'
})
export class BlogListComponent implements OnInit {
  @Input() blogs!: Blog[];
  @Input() blogIsSelected?: Blog;
  @Output() blogSelected = new EventEmitter<{blogId: number, i: number}>;

  blogLimit: boolean = false;
  #blogService: BlogService = inject(BlogService);
  activeBlog = signal<number>(-1);

  displayTooltip(i: number): string {
    const blogDescription: HTMLParagraphElement =
      document.getElementsByClassName('blogDescription')[
        i
      ] as HTMLParagraphElement;
    const isDescriptionOverflow: boolean = blogDescription.clientWidth < blogDescription.scrollWidth;
    return isDescriptionOverflow ? blogDescription.innerText : '';
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //     console.log(changes);
  //     this.#blogService.getBlogsByUser()
  // }

  ngOnInit(): void {
    this.blogLimit = this.blogs.length >= 5;
}

  selectBlog(blogId: number, i: number): void {
    this.activeBlog.set(i);
    this.blogSelected.emit({blogId, i});
  }
}
