import { Component, OnInit } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

import { CurrentUserService } from '../../service/current-user.service';
import { Utilisateur } from '../../service/utilisateur.service';
import { VoitureService, Voiture } from '../../service/voiture.service';
import { Loginservice } from '../../service/loginservice';

@Component({
  selector: 'app-moncompte',
  standalone: false,
  templateUrl: './moncompte.html',
  styleUrls: ['./moncompte.css'],
})
export class Moncompte implements OnInit {

  loading = true;
  error = '';

  user: Utilisateur | null = null;
  voitures: Voiture[] = [];

  vendeurId = 0;

  constructor(
    private currentUser: CurrentUserService,
    private voitureService: VoitureService,
    private loginService: Loginservice,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.loading = true;
    this.error = '';

    // ✅ 1) récupérer le vendeur connecté via /auth/profile
    this.loginService.profile().subscribe({
      next: (u: any) => {
        // stocker user
        this.user = u;

        // stocker currentUser (utile partout dans l'app)
        this.currentUser.set({
          id: u.id,
          nom: u.nom,
          role: u.role,
          email: u.email,
          telephone: u.telephone
        });

        this.vendeurId = u.id;

        // ✅ 2) charger ses voitures
        this.voitureService.getByVendeur(this.vendeurId).pipe(
          catchError(() => of([] as Voiture[]))
        ).subscribe({
          next: (cars) => {
            this.voitures = cars || [];
            this.loading = false;
          },
          error: (err) => {
            console.error(err);
            this.error = "Erreur lors du chargement de vos voitures.";
            this.loading = false;
          }
        });
      },
      error: (err) => {
        console.error(err);
        this.error = "Utilisateur non connecté. Veuillez vous connecter.";
        this.loading = false;
      }
    });
  }

  firstImage(v: Voiture): string | null {
    return v.images?.length ? (v.images?.[0] || null) : null;
  }

  show(val: any): string {
    return val === null || val === undefined || val === '' ? '—' : String(val);
  }

  deleteCar(id: number) {
    if (!confirm("Supprimer cette voiture ?")) return;

    this.voitureService.delete(id).subscribe({
      next: () => {
        this.voitures = this.voitures.filter(v => v.id !== id);
      },
      error: (err) => {
        console.error(err);
        this.error = "Erreur lors de la suppression.";
      }
    });
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
