import { Component } from '@angular/core';
import { VoitureService,Voiture } from '../../service/voiture.service';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-listevoiture',
  standalone: false,
  templateUrl: './listevoiture.html',
  styleUrls: ['./listevoiture.css'],
})
export class Listevoiture implements OnInit {
  
  voitures: Voiture[] = [];
  loading = false;
  error = '';

  // recherche (optionnelle)
  marque = '';
  modele = '';

  constructor(private voitureService: VoitureService, private router: Router) {}

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll() {
    this.loading = true;
    this.error = '';
    this.voitureService.getAll().subscribe({
      next: (data) => {
        this.voitures = data || [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur getAll voitures:', err);
        this.error = err?.error?.message || err?.message || "Erreur lors du chargement des voitures.";
        this.loading = false;
      }
    });
  }

  search() {
    // si les deux vides -> recharge tout
    if (!this.marque.trim() && !this.modele.trim()) {
      this.loadAll();
      return;
    }

    this.loading = true;
    this.error = '';
    this.voitureService.search(this.marque.trim(), this.modele.trim()).subscribe({
      next: (data) => {
        this.voitures = data || [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur search voitures:', err);
        this.error = err?.error?.message || err?.message || "Erreur lors de la recherche.";
        this.loading = false;
      }
    });
  }

  clearSearch() {
    this.marque = '';
    this.modele = '';
    this.loadAll();
  }

  viewDetails(id: number) {
    if (!id) return;
    this.router.navigate(['/admin', 'detaillevoiture', id]);
  }

  supprimer(id: number) {
    if (!id) return;
    if (!confirm('Confirmer la suppression de ce véhicule ?')) return;
    this.loading = true;
    this.error = '';
    this.voitureService.delete(id).subscribe({
      next: () => {
        this.voitures = this.voitures.filter(v => v.id !== id);
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur suppression voiture:', err);
        this.error = err?.error?.message || err?.message || 'Erreur lors de la suppression.';
        this.loading = false;
      }
    });
  }
}
