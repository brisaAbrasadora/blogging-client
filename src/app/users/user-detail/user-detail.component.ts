import {
  Component,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { User } from '../interfaces/user.entity'; 
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
  @Input() user!: User;

  #titleService = inject(Title);
  #router = inject(Router);

  goBack(): void {
    this.#router.navigate(['/users']);
  }

  ngOnInit(): void {
    this.#titleService.setTitle(`${this.user.username} details | Blogging`);
  }
}
