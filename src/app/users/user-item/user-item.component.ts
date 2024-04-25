import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { DeleteItemComponent } from '../../common/delete-item/delete-item.component';
import { User } from '../interfaces/user.entity';
import { RouterLink } from '@angular/router';
import { ItemToDelete } from '../../common/interfaces/item-to-delete.interface';

@Component({
  selector: 'tr[user-item]',
  standalone: true,
  imports: [CommonModule, RouterLink, DeleteItemComponent],
  templateUrl: './user-item.component.html',
  styleUrl: './user-item.component.css',
})
export class UserItemComponent {
  @Output() deleteItem = new EventEmitter<ItemToDelete>();
  constructor() {}

  @Input({ required: true }) user: User = {
    id: 0,
    username: 'Default',
    email: 'default@blogging.com',
    password: 'my-weak-password',
    memberSince: new Date(Date.now()).toString(),
    updatedAt: new Date(Date.now()).toString(),
  };

  onItemDeleted({ id, deleted }: ItemToDelete) {
    this.deleteItem.emit({ deleted: deleted, id: id });
  }
}
