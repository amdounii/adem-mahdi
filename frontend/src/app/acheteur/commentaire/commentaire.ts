import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AvisService, AvisUtilisateur } from '../../service/avis';
import { CurrentUserService } from '../../service/current-user.service';

@Component({
  selector: 'app-commentaire',
  standalone: false,
  templateUrl: './commentaire.html',
  styleUrls: ['./commentaire.css']
})
export class Commentaire implements OnInit {

  voitureId = 0;

  avis: AvisUtilisateur[] = [];
  loading = true;
  error = '';

  // form
  commentaire = '';
  note = 5;
  sending = false;

  constructor(
    private route: ActivatedRoute,
    private avisService: AvisService,
    private currentUser: CurrentUserService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.voitureId = id ? Number(id) : 0;
    this.load();
  }

  load() {
    this.loading = true;
    this.error = '';

    this.avisService.getByVoiture(this.voitureId).subscribe({
      next: (list) => {
        this.avis = list || [];
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = "Erreur lors du chargement des commentaires.";
        this.loading = false;
      }
    });
  }

  submit() {
    const user = this.currentUser.snapshot;

    if (!user?.id) {
      this.error = "Utilisateur non connecté (id introuvable).";
      return;
    }
    if (!this.commentaire.trim()) {
      this.error = "Veuillez écrire un commentaire.";
      return;
    }

    this.sending = true;
    this.error = '';

    const payload: AvisUtilisateur = {
      voitureId: this.voitureId,
      acheteurId: user.id,              // ✅ selon ton controller / service backend
      commentaire: this.commentaire.trim(),
      note: this.note
    };

    this.avisService.addAvis(payload).subscribe({
      next: () => {
        this.commentaire = '';
        this.note = 5;
        this.sending = false;
        this.load();
      },
      error: (err) => {
        console.error(err);
        this.error = "Impossible d'ajouter le commentaire.";
        this.sending = false;
      }
    });
  }
}
