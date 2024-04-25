import { Component, Signal, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UsersService } from '../../users/services/users.service';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  title = 'Blogging';
  logged: Signal<boolean> = computed(() => this.#usersService.logged());
  #usersService: UsersService = inject(UsersService);
}
