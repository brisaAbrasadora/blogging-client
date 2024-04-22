import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { User } from '../interfaces';
import { DeleteItemComponent } from '../delete-item/delete-item.component';

@Component({
  selector: 'tr[user-item]',
  standalone: true,
  imports: [CommonModule, DeleteItemComponent],
  templateUrl: './user-item.component.html',
  styleUrl: './user-item.component.css',
})
export class UserItemComponent {
  @Output() deleteItem = new EventEmitter<number>();
  constructor() {}

  @Input({ required: true }) user: User = {
    id: 0,
    username: 'Default',
    email: 'default@blogging.com',
    password: 'my-weak-password',
    memberSince: '01/01/1990',
  };

  onItemDeleted(itemId: number) {
    this.deleteItem.emit(itemId);
  }
}
