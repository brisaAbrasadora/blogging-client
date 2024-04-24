import {
  Component,
  Input,
  OnInit,
  inject,
  numberAttribute,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UsersService } from '../services/users.service';
import { User } from '../interfaces/entities';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'user-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css',
})
export class UserDetailComponent implements OnInit {
  @Input({ transform: numberAttribute }) set id(id: number) {
    this.#usersService.getUser(id).subscribe({
      next: (user) => {
        this.user = user;
      },
      error: (error) => {
        console.log(error.error);
        this.goBack();
      },
    });
  }
  user?: User;

  #usersService = inject(UsersService);
  #titleService = inject(Title);
  #router = inject(Router);

  goBack(): void {
    this.#router.navigateByUrl('/');
  }

  ngOnInit(): void {
    this.#titleService.setTitle(`${this.user?.username} details | Blogging`);
  }
}
