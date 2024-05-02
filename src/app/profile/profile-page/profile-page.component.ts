import {
  Component,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { User } from '../../users/interfaces/user.entity';

@Component({
  selector: 'profile-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent implements OnInit {
  @Input() user!: User;

  headers = {
    id: 'ID',
    'title': 'Title',
  };

  #titleService = inject(Title);
  #router = inject(Router);

  goBack(): void {
    this.#router.navigate(['/users']);
  }

  ngOnInit(): void {
    this.#titleService.setTitle(`${this.user.username} details | Blogging`);
    console.log(this.user);
  }
}
