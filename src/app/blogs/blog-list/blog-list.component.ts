import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Blog } from '../interfaces/entities';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'blog-list',
  standalone: true,
  imports: [CommonModule, NgbModule, RouterLink],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.scss'
})
export class BlogListComponent implements OnInit {
  @Input() blogs!: Blog[];

  blogLimit: boolean = false;

  displayTooltip(i: number): string {
    const blogDescription: HTMLParagraphElement =
      document.getElementsByClassName('blogDescription')[
        i
      ] as HTMLParagraphElement;
    const isDescriptionOverflow: boolean = blogDescription.clientWidth < blogDescription.scrollWidth;
    return isDescriptionOverflow ? blogDescription.innerText : '';
  }

  ngOnInit(): void {
    this.blogLimit = this.blogs.length >= 5;
}
}
