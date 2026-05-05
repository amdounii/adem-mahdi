import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-inscription',
  standalone: false,
  templateUrl: './inscription.html',
  styleUrls: ['./inscription.css']
})
export class Inscription {

  // champs formulaire
  nom = '';
  email = '';
  telephone = '';
  motDePasse = '';
  role = 'ACHETEUR';

  loading = false;
  error = '';
  success = '';

  private readonly API_URL = 'http://localhost:8080';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  submit() {
    this.error = '';
    this.success = '';

    // 🔎 validations frontend PRO
    if (!this.nom.trim()) {
      this.error = 'Le nom est obligatoire.';
      return;
    }

    if (!this.email.trim()) {
      this.error = 'Email obligatoire.';
      return;
    }

    if (!this.telephone.trim()) {
      this.error = 'Téléphone obligatoire.';
      return;
    }

    if (!this.motDePasse || this.motDePasse.length < 6) {
      this.error = 'Le mot de passe doit contenir au moins 6 caractères.';
      return;
    }

    this.loading = true;

    const payload = {
      nom: this.nom.trim(),
      email: this.email.trim(),
      telephone: this.telephone.trim(),
      motDePasse: this.motDePasse,
      role: this.role
    };

    this.http.post(`${this.API_URL}/auth/register`, payload, {
      withCredentials: true
    }).subscribe({
      next: () => {
        this.loading = false;
        this.success = 'Compte créé avec succès 🎉';
        setTimeout(() => this.router.navigate(['']), 1000);
      },
      error: (err) => {
        this.loading = false;
        this.error = err?.error || 'Erreur lors de l’inscription.';
      }
    });
  }

  goLogin() {
    this.router.navigate(['']);
  }
}
