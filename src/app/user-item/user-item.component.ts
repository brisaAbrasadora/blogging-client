import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { User } from '../interfaces';

@Component({
  selector: 'tr[user-item]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-item.component.html',
  styleUrl: './user-item.component.css',
})
export class UserItemComponent {
  constructor() {}

  @Input({ required: true })
  user!: User;
}
