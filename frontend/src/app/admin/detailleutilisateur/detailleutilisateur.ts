import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UtilisateurService, Utilisateur } from '../../service/utilisateur.service';

@Component({
  selector: 'app-detailleutilisateur',
  standalone: false,
  templateUrl: './detailleutilisateur.html',
  styleUrls: ['./detailleutilisateur.css'],
})
export class Detailleutilisateur implements OnInit {
  utilisateur?: Utilisateur;
  loading = false;
  error = '';

  constructor(private route: ActivatedRoute, private utilisateurService: UtilisateurService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      this.error = 'ID utilisateur invalide.';
      return;
    }
    this.loading = true;
    this.utilisateurService.getById(id).subscribe({
      next: (u) => { this.utilisateur = u; this.loading = false; },
      error: (err) => { console.error('Erreur getById utilisateur:', err); this.error = err?.error?.message || err?.message || 'Erreur lors du chargement.'; this.loading = false; }
    });
  }
}
