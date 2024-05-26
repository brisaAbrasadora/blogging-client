import { Component, Input, OnInit, inject } from '@angular/core';
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
    title: 'Title',
    description: 'Description',
    created: 'Created at',
    updated: 'Updated at',
  };

  now = new Date().getTime();
  egghead: object[] = [];

  #titleService = inject(Title);
  #router = inject(Router);

  getDateDiff(updatedAt: Date) {
    const bla = updatedAt.toString();
    const ms = Date.now() - Date.parse(bla);
    const seconds = ms / 1000;
    const minutes = seconds / 60;
    const hours = minutes / 60;
    const days = hours / 24;

    return {dias: Math.floor(days),
      horas: Math.floor(hours % 24),
      minutos: Math.floor(minutes % 60),
      segundos: Math.floor(seconds % 60),
      milisegundos: ms % 1000
    };
  }

  goBack(): void {
    this.#router.navigate(['/users']);
  }

  ngOnInit(): void {
    this.#titleService.setTitle(`${this.user.username} details | Blogging`);
    console.log(this.user);
    console.log(this.user.blogs);
    for(let i = 0; i < this.user.blogs!.length; i++) {
      this.egghead[i] = this.getDateDiff(this.user.blogs![i].updatedAt);
      console.log(this.egghead[i]);
    }
  }
}
