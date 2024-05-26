import { Component, Input } from '@angular/core';
import { Entry } from '../../entries/interfaces/entities';

@Component({
  selector: 'entries-tab',
  standalone: true,
  imports: [],
  templateUrl: './entries-tab.component.html',
  styleUrl: './entries-tab.component.scss',
})
export class EntriesTabComponent {
  @Input({ required: true }) entries!: Entry[];
}
