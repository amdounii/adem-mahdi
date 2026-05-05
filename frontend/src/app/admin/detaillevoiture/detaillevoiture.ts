import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VoitureService, Voiture } from '../../service/voiture.service';

@Component({
  selector: 'app-detaillevoiture',
  standalone: false,
  templateUrl: './detaillevoiture.html',
  styleUrls: ['./detaillevoiture.css'],
})
export class Detaillevoiture implements OnInit {
  voiture?: Voiture;
  loading = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private voitureService: VoitureService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      this.error = 'ID véhicule invalide.';
      return;
    }
    this.loading = true;
    this.voitureService.getById(id).subscribe({
      next: (v) => {
        this.voiture = v;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur getById voiture:', err);
        this.error = err?.error?.message || err?.message || 'Erreur lors du chargement du véhicule.';
        this.loading = false;
      }
    });
  }
}
