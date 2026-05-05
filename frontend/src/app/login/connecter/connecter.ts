import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Loginservice } from '../../service/loginservice';
import { CurrentUserService } from '../../service/current-user.service';

@Component({
  selector: 'app-connecter',
  standalone: false,
  templateUrl: './connecter.html',
  styleUrls: ['./connecter.css']
})
export class Connecter {
  email = '';
  motDePasse = '';
  role="";
  error = '';

  constructor(
    private auth: Loginservice,
    private router: Router,
    private currentUser: CurrentUserService
  ) {}

  submit() {
    this.error = '';

    this.auth.login(this.email, this.motDePasse,this.role).subscribe({
      next: () => {
        this.auth.me().subscribe({
          next: (user: any) => {
            if (!user) {
              this.error = "Impossible de récupérer l'utilisateur.";
              return;
            }


    this.currentUser.set({ id: user.id, role: user.role });



            // redirection selon role
            switch (user.role) {
              case 'ADMIN':
                this.router.navigate(['/admin']);
                break;

              case 'VENDEUR':
                this.router.navigate(['/vendeur']); // ou juste ['/vendeur']
                break;

              case 'ACHETEUR':
                this.router.navigate(['/acheteur']); // ou juste ['/acheteur']
                break;

              default:
                // si role inconnu
                this.router.navigate(['/']);
                break;
            }
          },
          error: () => {
            this.error = "Erreur lors de la récupération de l'utilisateur.";
          }
        });
      },
      error: () => {
        this.error = 'Login incorrect';
      }
    });
  }
  goisncription(){
    this.router.navigate(['/inscription']);
  }
}
