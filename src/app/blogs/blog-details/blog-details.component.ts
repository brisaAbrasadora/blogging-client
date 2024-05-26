import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EntriesTabComponent } from '../../tabs/entries-tab/entries-tab.component';
import { Blog } from '../interfaces/entities';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SettingsTabComponent } from '../../tabs/settings-tab/settings-tab.component';

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
  @Output() titleUpdated = new EventEmitter<string>();

  onTitleUpdated(title: string) {
    this.blog!.title = title;
    this.titleUpdated.emit(title);
  }

  resetSelectedBlog() {
    this.closeDetails.emit();
  }

}
