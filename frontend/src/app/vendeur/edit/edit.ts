import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VoitureService, Voiture } from '../../service/voiture.service';

@Component({
  selector: 'app-edit',
  standalone: false,
  templateUrl: './edit.html',
  styleUrls: ['./edit.css'],
})
export class Edit implements OnInit {

  id = 0;

  loading = true;
  saving = false;
  error = '';
  success = '';

  voiture: Voiture | null = null;

  marque = '';
  modele = '';
  annee: number | null = null;
  kilometrage: number | null = null;
  prixVendeur: number | null = null;
  statut = 'DISPONIBLE';
  description = '';
  imagesText = '';

  submitted = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private voitureService: VoitureService
  ) {}

  get imagesCount(): number {
    return this.imagesText
      .split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0).length;
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.id = idParam ? Number(idParam) : 0;

    if (!this.id) {
      this.error = "ID voiture invalide.";
      this.loading = false;
      return;
    }

    this.load();
  }

  load() {
    this.loading = true;
    this.error = '';
    this.success = '';
    this.submitted = false;

    this.voitureService.getById(this.id).subscribe({
      next: (v) => {
        this.voiture = v;

        this.marque = v.marque || '';
        this.modele = v.modele || '';
        this.annee = v.annee ?? null;
        this.kilometrage = v.kilometrage ?? null;
        this.prixVendeur = v.prixVendeur ?? null;
        this.statut = (v.statut || 'DISPONIBLE');
        this.description = v.description || '';
        this.imagesText = (v.images || []).join(', ');

        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = "Impossible de charger la voiture.";
        this.loading = false;
      }
    });
  }

  save() {
    this.submitted = true;
    this.error = '';
    this.success = '';

    // ✅ validations front
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

    const payload: Partial<Voiture> = {
      marque: this.marque.trim(),
      modele: this.modele.trim(),
      annee: this.annee ?? undefined,
      kilometrage: this.kilometrage ?? undefined,
      prixVendeur: this.prixVendeur ?? undefined,
      statut: this.statut,
      description: this.description?.trim() || undefined,
      images
    };

    this.saving = true;

    this.voitureService.update(this.id, payload).subscribe({
      next: () => {
        this.saving = false;
        this.success = "Modifications enregistrées ✅";
        setTimeout(() => this.router.navigate(['/vendeur/moncompte']), 700);
      },
      error: (err) => {
        this.saving = false;

        const backendMsg =
          typeof err?.error === 'string'
            ? err.error
            : err?.error?.message
            ? err.error.message
            : err?.message
            ? err.message
            : '';

        this.error = backendMsg || "Erreur lors de la modification.";
        console.error('Update voiture error:', err);
      }
    });
  }

  cancel() {
    this.router.navigate(['/vendeur/moncompte']);
  }


}
