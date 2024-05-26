import { Component, Signal, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { LoginComponent } from '../auth/login/login.component';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, LoginComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  title = 'Blogging';
  logged: Signal<boolean> = computed(() => this.#authService.logged());
  #authService: AuthService = inject(AuthService);
  username: Signal<string> = computed(() => this.#authService.username());

  logout(): void {
    this.#authService.logout();
  }
}
