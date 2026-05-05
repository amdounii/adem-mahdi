import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { VoitureService } from '../../service/voiture.service';
import { CurrentUserService } from '../../service/current-user.service';

@Component({
  selector: 'app-publier',
  standalone: false,
  templateUrl: './publier.html',
  styleUrls: ['./publier.css'],
})
export class Publier {
  loading = false;
  error = '';
  success = '';
  submitted = false;

  marque = '';
  modele = '';
  annee: number | null = null;
  kilometrage: number | null = null;
  prixVendeur: number | null = null;
  statut = 'DISPONIBLE';
  description = '';
  imagesText = '';

  constructor(
    private voitureService: VoitureService,
    private currentUser: CurrentUserService,
    private router: Router
  ) {}

  get imagesCount(): number {
    return this.imagesText
      .split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0).length;
  }

  submit() {
    this.submitted = true;
    this.error = '';
    this.success = '';

    const u = this.currentUser.snapshot;
    if (!u?.id) {
      this.error = "Utilisateur non connecté. Veuillez vous reconnecter.";
      return;
    }

    // ✅ validations front simples
    if (!this.marque.trim()) {
      this.error = "Veuillez saisir la marque.";
      return;
    }

    if (!this.modele.trim()) {
      this.error = "Veuillez saisir le modèle.";
      return;
    }

    if (this.prixVendeur == null || this.prixVendeur <= 0) {
      this.error = "Veuillez saisir un prix valide (supérieur à 0).";
      return;
    }

    const images = this.imagesText
      .split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    if (images.length > 10) {
      this.error = "Maximum 10 images autorisées.";
      return;
    }

    const payload: any = {
      marque: this.marque.trim(),
      modele: this.modele.trim(),
      annee: this.annee,
      kilometrage: this.kilometrage,
      prixVendeur: this.prixVendeur,
      statut: this.statut,
      description: this.description?.trim() || null,
      images,
      vendeurId: u.id
    };

    this.loading = true;

    this.voitureService.create(payload).subscribe({
      next: () => {
        this.loading = false;
        this.success = "Voiture ajoutée avec succès ✅";
        setTimeout(() => this.router.navigate(['/vendeur']), 700);
      },
      error: (err) => {
        this.loading = false;

        // ✅ récupérer le message exact du backend
        const backendMsg =
          typeof err?.error === 'string'
            ? err.error
            : err?.error?.message
            ? err.error.message
            : err?.message
            ? err.message
            : '';

        // ✅ AFFICHER LE MESSAGE BACKEND TEL QUEL
        this.error = backendMsg || "Erreur lors de l'ajout de la voiture.";

        console.error('Create voiture error:', err);
      }
    });
  }

  cancel() {
    this.router.navigate(['/vendeur']);
  }
}
