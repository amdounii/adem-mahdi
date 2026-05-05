import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Loginservice } from '../../service/loginservice';
import { CurrentUserService } from '../../service/current-user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.html',
  styleUrls: ['./menu.css']
})
export class Menu {
  constructor(private router: Router,
              private loginService: Loginservice,
              private currentUser: CurrentUserService
  ) {}

  goToVoitures() {
    this.router.navigate(['/admin', 'listevoiture']);
  }

  goToUtilisateurs() {
    this.router.navigate(['/admin', 'listeutilisateur']);
  }
  logout() {
  if (!confirm("Voulez-vous vraiment vous déconnecter ?")) return;

  this.loginService.logout().subscribe({
    next: () => {
      this.currentUser.clear();

      // redirection vers login
      this.router.navigate(['']);
    },
    error: (err) => {
      console.error(err);
      this.currentUser.clear();
      this.router.navigate(['']);
    }
  });
}
}
