import { Component, Input, inject } from '@angular/core';
import { ItemToDelete } from '../interfaces/item-to-delete.interface';
import { UsersService } from '../../users/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'delete-item',
  standalone: true,
  imports: [],
  templateUrl: './delete-item.component.html',
  styleUrl: './delete-item.component.css',
})
export class DeleteItemComponent {
  @Input({ required: true }) item!: ItemToDelete;

  #usersService: UsersService = inject(UsersService);
  #router: Router = inject(Router);

  deleteItem({ id, type }: ItemToDelete) {
    console.log(this.item);
    switch (type) {
      case 'user':
        this.#deleteUser(id);
        break;
      default:
        console.log('error');
    }
  }

  #deleteUser(id: number): void {
    this.#usersService.deleteUser(id).subscribe({
      next: () => console.log('deleted'),
      error: (error) => console.log(error.error)
    });
  }
}
