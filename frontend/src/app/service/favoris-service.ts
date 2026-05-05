import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Favoris {
  id?: number;
  utilisateurId: number;
  voitureId: number;
  dateAjout?: string;
}

@Injectable({ providedIn: 'root' })
export class FavorisService {
  private readonly API_URL = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  // ✅ liste des favoris d'un utilisateur
  getByUtilisateur(utilisateurId: number): Observable<Favoris[]> {
    return this.http.get<Favoris[]>(
      `${this.API_URL}/api/favoris/utilisateur/${utilisateurId}`,
      { withCredentials: true }
    );
  }

  // ✅ vérifier si une voiture est déjà en favoris
  isFavori(utilisateurId: number, voitureId: number): Observable<boolean> {
    return this.http.get<boolean>(
      `${this.API_URL}/api/favoris/check?utilisateurId=${utilisateurId}&voitureId=${voitureId}`,
      { withCredentials: true }
    );
  }

  // ✅ toggle (si existe => supprime / sinon => ajoute)
  toggle(utilisateurId: number, voitureId: number): Observable<string> {
    return this.http.post(
      `${this.API_URL}/api/favoris/toggle?utilisateurId=${utilisateurId}&voitureId=${voitureId}`,
      {},
      { responseType: 'text', withCredentials: true }
    );
  }
}
