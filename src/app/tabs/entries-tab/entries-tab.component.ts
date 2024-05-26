import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Entry } from '../../entries/interfaces/entities';
import { Blog } from '../../blogs/interfaces/entities';
import { EntryService } from '../../entries/services/entry.service';

@Component({
  selector: 'entries-tab',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './entries-tab.component.html',
  styleUrl: './entries-tab.component.scss',
})
export class EntriesTabComponent implements OnInit {
  @Input({ required: true }) blog!: Blog;
  @Input({ required: true }) entries!: Entry[];
  blogTitle: string | undefined = undefined;
  #entryService: EntryService = inject(EntryService);

  deleteEntry(id: number) {
    this.#entryService.deleteEntry(id).subscribe({
      next: () => (this.entries = this.entries.filter((e) => e.id !== id)),
      error: (error) => console.log(error.error),
    });
  }

  ngOnInit(): void {
    this.blogTitle = this.blog.title;
  }
}
