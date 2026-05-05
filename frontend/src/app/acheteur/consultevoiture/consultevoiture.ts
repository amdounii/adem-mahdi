import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, switchMap, finalize } from 'rxjs/operators';

import { VoitureService, Voiture } from '../../service/voiture.service';
import { UtilisateurService, Utilisateur } from '../../service/utilisateur.service';

@Component({
  selector: 'app-consultevoiture',
  standalone: false,
  templateUrl: './consultevoiture.html',
  styleUrls: ['./consultevoiture.css'],
})
export class Consultevoiture implements OnInit {
  loading = true;
  error = '';

  voiture: Voiture | null = null;
  vendeur: Utilisateur | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private voitureService: VoitureService,
    private utilisateurService: UtilisateurService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id || Number.isNaN(id)) {
      this.error = 'ID voiture invalide.';
      this.loading = false;
      return;
    }

    this.loading = true;
    this.error = '';
    this.voiture = null;
    this.vendeur = null;

    // ✅ 1) Charger la voiture
    this.voitureService.getById(id).pipe(
      catchError((err) => {
        console.error(err);
        this.error = 'Impossible de charger la voiture.';
        return of(null);
      }),
      // ✅ 2) Charger le vendeur (public) si vendeurId existe
      switchMap((v: Voiture | null) => {
        this.voiture = v;

        if (!v || !v.vendeurId) {
          this.vendeur = null;
          return of(null);
        }

        // ⚠️ IMPORTANT: utiliser public endpoint (pas /api/utilisateurs/{id})
        return this.utilisateurService.getPublicById(v.vendeurId).pipe(
          catchError((err) => {
            console.error(err);
            return of(null);
          })
        );
      }),
      finalize(() => {
        this.loading = false;
      })
    ).subscribe((u: Utilisateur | null) => {
      this.vendeur = u;
    });
  }

  back() {
    // si tu veux revenir à la page précédente :
    // window.history.back();

    // sinon adapte selon ton flux
    this.router.navigate(['/acheteur']);
  }

  firstImage(v: Voiture | null): string {
    return v?.images?.[0] || '';
  }
}
