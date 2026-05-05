import { Component, OnInit } from '@angular/core';
import { UtilisateurService, Utilisateur } from '../../service/utilisateur.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listeutilisateur',
  standalone: false,
  templateUrl: './listeutilisateur.html',
  styleUrls: ['./listeutilisateur.css'],
})
export class Listeutilisateur implements OnInit {
  utilisateurs: Utilisateur[] = [];
  allUtilisateurs: Utilisateur[] = [];
  loading = false;
  error = '';
  filter = '';

  constructor(private utilisateurService: UtilisateurService, private router: Router) {}

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll() {
    this.loading = true;
    this.error = '';
    this.utilisateurService.getAll().subscribe({
      next: (data) => {
        this.allUtilisateurs = data || [];
        this.utilisateurs = [...this.allUtilisateurs];
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur getAll utilisateurs:', err);
        this.error = err?.error?.message || err?.message || 'Erreur lors du chargement des utilisateurs.';
        this.loading = false;
      }
    });
  }

  viewDetails(id: number) {
    if (!id) return;
    this.router.navigate(['/admin', 'detailleutilisateur', id]);
  }

  supprimer(id: number) {
    if (!id) return;
    if (!confirm('Confirmer la suppression de cet utilisateur ?')) return;
    this.loading = true;
    this.error = '';
    this.utilisateurService.delete(id).subscribe({
      next: () => {
        this.utilisateurs = this.utilisateurs.filter(u => u.id !== id);
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur suppression utilisateur:', err);
        this.error = err?.error?.message || err?.message || 'Erreur lors de la suppression.';
        this.loading = false;
      }
    });
  }

  search() {
    const q = this.filter?.trim().toLowerCase();
    if (!q) {
      this.utilisateurs = [...this.allUtilisateurs];
      return;
    }

    this.utilisateurs = this.allUtilisateurs.filter(u => {
      const full = `${u.nom ?? ''}  ${u.email ?? ''}`.toLowerCase();
      return full.includes(q);
    });
  }

  clearFilter() {
    this.filter = '';
    this.utilisateurs = [...this.allUtilisateurs];
  }
}
