import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EntriesTabComponent } from '../../tabs/entries-tab/entries-tab.component';
import { Blog } from '../interfaces/entities';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SettingsTabComponent } from '../../tabs/settings-tab/settings-tab.component';
import { BlogToUpdate } from '../../common/interfaces/blog-to-update.interface';

@Component({
  selector: 'blog-details',
  standalone: true,
  imports: [CommonModule, EntriesTabComponent, RouterLink, SettingsTabComponent],
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.scss'
})
export class BlogDetailsComponent {
  @Input() blog?: Blog;
  @Output() closeDetails = new EventEmitter<void>();
  @Output() titleUpdated = new EventEmitter<BlogToUpdate>();
  @Output() descriptionUpdated = new EventEmitter<string>();
  @Output() blogDeleted = new EventEmitter<number>();

  onBlogDeleted(id: number) {
    this.closeDetails.emit();
    this.blogDeleted.emit(id);
  }

  onDescriptionUpdated(description: string) {
    this.blog!.description = description;
    this.descriptionUpdated.emit(description);
  }

  onTitleUpdated({ id, title }: BlogToUpdate) {
    this.blog!.title = title!;
    this.titleUpdated.emit({id: id, title: title});
  }

  resetSelectedBlog() {
    this.closeDetails.emit();
  }

}
