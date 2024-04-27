import {
  Component,
  OnInit,
  WritableSignal,
  computed,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { UserFilterPipe } from '../pipes/user-filter.pipe';
import { UserItemComponent } from '../user-item/user-item.component';
import { RegisterComponent } from '../../auth/register/register.component';
import { UsersService } from '../services/users.service';
import { User } from '../interfaces/user.entity';
import { ItemToDelete } from '../../common/interfaces/item-to-delete.interface';

@Component({
  selector: 'users-page',
  standalone: true,
  imports: [FormsModule, UserFilterPipe, UserItemComponent, RegisterComponent],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.css',
})
export class UsersPageComponent implements OnInit {
  #usersService = inject(UsersService);

  title: string = 'Users registered in Blogging';
  headers = {
    id: 'id',
    username: 'Username',
    email: 'Email',
    memberSince: 'Member since',
    delete: 'Delete',
  };
  search: WritableSignal<string> = signal('');
  filteredUsers = computed(() =>
    this.users().filter((u) =>
      u.username.toLowerCase().includes(this.search().toLowerCase())
    )
  );
  users: WritableSignal<User[]> = signal([]);

  constructor() {}

  ngOnInit(): void {
    this.#usersService
      .getUsers()
      .subscribe({
        next: (users) => {
          this.users.set(users);
        },
        error: (error) => console.log(error),
      })
      .add(() => console.log('Users loaded!'));
  }

  onDeleteItem({ deleted, id }: ItemToDelete): void {
    if (deleted) {
      this.users.set(this.users().filter((u) => u.id !== id));
    } else {
      console.log(`error at deleting item ${id}`);
    }
  }
}
