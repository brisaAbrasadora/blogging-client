import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EntriesTabComponent } from '../../entries/entries-tab/entries-tab.component';
import { Blog } from '../interfaces/entities';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'blog-details',
  standalone: true,
  imports: [CommonModule, EntriesTabComponent, RouterLink],
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.scss'
})
export class BlogDetailsComponent {
  @Input() blog?: Blog;
  @Output() closeDetails = new EventEmitter<void>;

  resetSelectedBlog() {
    console.log('i want to close');
    this.closeDetails.emit();
  }
}
