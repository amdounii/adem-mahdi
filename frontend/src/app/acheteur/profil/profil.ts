import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { catchError, finalize, map, switchMap } from 'rxjs/operators';

import { CurrentUserService } from '../../service/current-user.service';
import { Utilisateur } from '../../service/utilisateur.service';
import { FavorisService } from '../../service/favoris-service';
import { Voiture, VoitureService } from '../../service/voiture.service';
import { Loginservice } from '../../service/loginservice';

@Component({
  selector: 'app-profil',
  standalone: false,
  templateUrl: './profil.html',
  styleUrls: ['./profil.css'],
})
export class Profil implements OnInit {

  loading = true;
  error = '';

  user: Utilisateur | null = null;

  favorisLoading = true;
  favorisError = '';
  favorisVoitures: Voiture[] = [];

  constructor(
    private router: Router,
    private currentUser: CurrentUserService,
    private favorisService: FavorisService,
    private voitureService: VoitureService,
    private loginService: Loginservice
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.error = '';

    // ✅ Profil via /auth/profile (PAS /api/utilisateurs/{id})
    this.loginService.profile().pipe(
      finalize(() => (this.loading = false))
    ).subscribe({
      next: (u: any) => {
        this.user = u;

        // ✅ enregistrer l'utilisateur courant en mémoire
        this.currentUser.set({
          id: u.id,
          nom: u.nom,
          role: u.role,
          email: u.email,
          telephone: u.telephone
        });

        // ✅ charger favoris
        this.loadFavoris(u.id);
      },
      error: (err) => {
        console.error(err);
        this.error = "Vous n'êtes pas connecté ou profil inaccessible.";
        this.router.navigate(['/login']);
      }
    });
  }

  loadFavoris(userId: number) {
    this.favorisLoading = true;
    this.favorisError = '';

    this.favorisService.getByUtilisateur(userId).pipe(
      switchMap((list: any[]) => {
        const ids = (list || []).map(f => f.voitureId).filter(Boolean);

        if (!ids.length) return of([] as Voiture[]);

        return forkJoin(
          ids.map((id: number) =>
            this.voitureService.getById(id).pipe(
              catchError(() => of(null as any))
            )
          )
        ).pipe(
          map((arr) => (arr || []).filter(v => !!v) as Voiture[])
        );
      }),
      finalize(() => (this.favorisLoading = false))
    ).subscribe({
      next: (cars) => (this.favorisVoitures = cars),
      error: (err) => {
        console.error(err);
        this.favorisError = "Impossible de charger vos favoris.";
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

  goDetails(id: number) {
    this.router.navigate(['/acheteur/consulte', id]);
  }

  goCommentaires(id: number) {
    this.router.navigate(['/acheteur/commentaire', id]);
  }

  removeFavori(voitureId: number) {
    const userId = this.currentUser.snapshot?.id;
    if (!userId) return;

    this.favorisService.toggle(userId, voitureId).subscribe({
      next: () => {
        this.favorisVoitures = this.favorisVoitures.filter(v => v.id !== voitureId);
      },
      error: (err) => {
        console.error(err);
        this.favorisError = err?.error || "Erreur lors de la suppression du favori.";
      }
    });
  }

  firstImage(v: Voiture): string | null {
    return v.images && v.images.length > 0 ? v.images[0] : null;
  }

  show(val: any): string {
    return val === null || val === undefined || val === '' ? '—' : String(val);
  }

  
}
