import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Voiture, VoitureService } from '../../service/voiture.service';
import { CurrentUserService } from '../../service/current-user.service';
import { FavorisService } from '../../service/favoris-service';

type Num = number | null;

@Component({
  selector: 'app-acceuil',
  standalone: false,
  templateUrl: './acceuil.html',
  styleUrls: ['./acceuil.css'],
})
export class Acceuil implements OnInit {

  voitures: Voiture[] = [];
  filtered: Voiture[] = [];
  loading = false;
  error = '';

  marque = '';
  modele = '';
  statut = '';

  prixMin: Num = null;
  prixMax: Num = null;
  kmMin: Num = null;
  kmMax: Num = null;
  anneeMin: Num = null;
  anneeMax: Num = null;

  // ✅ favoris (set des voitureId favoris)
  favorisIds = new Set<number>();
  userId: number | null = null;

  constructor(
    private voitureService: VoitureService,
    private router: Router,
    private currentUser: CurrentUserService,
    private favorisService: FavorisService
  ) {}

  ngOnInit(): void {
    this.userId = this.currentUser.snapshot?.id ?? null;
    this.fetch();

    if (this.userId) {
      this.loadFavoris();
    }
  }

  goMonCompte() {
    this.router.navigate(['/acheteur/profil']);
  }

  fetch(): void {
    this.loading = true;
    this.error = '';

    this.voitureService.getAll().subscribe({
      next: (list) => {
        this.voitures = list || [];
        this.applyFilters();
        this.loading = false;
      },
      error: () => {
        this.error = 'Erreur lors du chargement des voitures';
        this.loading = false;
      }
    });
  }

  // ✅ charger favoris du user
  loadFavoris() {
    if (!this.userId) return;

    this.favorisService.getByUtilisateur(this.userId).subscribe({
      next: (list) => {
        this.favorisIds.clear();
        (list || []).forEach(f => this.favorisIds.add(f.voitureId));
      },
      error: () => {
        // on ignore (optionnel) mais tu peux afficher un msg
      }
    });
  }

  // ✅ check UI
  isFavori(voitureId: number): boolean {
    return this.favorisIds.has(voitureId);
  }

  // ✅ toggle favoris
  toggleFavori(voitureId: number) {
    if (!this.userId) {
      this.error = "Veuillez vous connecter pour ajouter aux favoris.";
      return;
    }

    this.favorisService.toggle(this.userId, voitureId).subscribe({
      next: (res) => {
        if (res === 'AJOUTE') this.favorisIds.add(voitureId);
        if (res === 'SUPPRIME') this.favorisIds.delete(voitureId);
      },
      error: (err) => {
        console.error(err);
        this.error = err?.error || "Erreur favoris.";
      }
    });
  }

  resetFilters(): void {
    this.marque = '';
    this.modele = '';
    this.statut = '';
    this.prixMin = null;
    this.prixMax = null;
    this.kmMin = null;
    this.kmMax = null;
    this.anneeMin = null;
    this.anneeMax = null;
    this.applyFilters();
  }

  applyFilters(): void {
    const m = this.marque.trim().toLowerCase();
    const mo = this.modele.trim().toLowerCase();
    const st = this.statut.trim().toLowerCase();

    this.filtered = (this.voitures || []).filter(v => {
      const marqueOk = !m || (v.marque || '').toLowerCase().includes(m);
      const modeleOk = !mo || (v.modele || '').toLowerCase().includes(mo);
      const statutOk = !st || (v.statut || '').toLowerCase() === st;

      const prix = v.prixVendeur ?? null;
      const km = v.kilometrage ?? null;
      const annee = v.annee ?? null;

      const prixMinOk = this.prixMin == null || (prix != null && prix >= this.prixMin);
      const prixMaxOk = this.prixMax == null || (prix != null && prix <= this.prixMax);

      const kmMinOk = this.kmMin == null || (km != null && km >= this.kmMin);
      const kmMaxOk = this.kmMax == null || (km != null && km <= this.kmMax);

      const anneeMinOk = this.anneeMin == null || (annee != null && annee >= this.anneeMin);
      const anneeMaxOk = this.anneeMax == null || (annee != null && annee <= this.anneeMax);

      return (
        marqueOk && modeleOk && statutOk &&
        prixMinOk && prixMaxOk &&
        kmMinOk && kmMaxOk &&
        anneeMinOk && anneeMaxOk
      );
    });
  }

  firstImage(v: Voiture): string | null {
    return v.images && v.images.length > 0 ? v.images[0] : null;
  }

  show(val: any): string {
    return val === null || val === undefined || val === '' ? '—' : String(val);
  }

  goCommentaires(id: number) {
    this.router.navigate(['/acheteur/commentaire', id]);
  }

  godetaille(id: number) {
    this.router.navigate(['/acheteur/consulte', id]);
  }
}
