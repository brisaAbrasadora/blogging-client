import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../interfaces/user.entity';

@Pipe({
  name: 'userFilter',
  standalone: true,
})
export class UserFilterPipe implements PipeTransform {
  transform(users: User[], search?: string): User[] {
    const searchLower = search?.toLocaleLowerCase();
    return searchLower
      ? users.filter((user) =>
          user.username.toLocaleLowerCase().includes(searchLower)
        )
      : users;
  }
}
