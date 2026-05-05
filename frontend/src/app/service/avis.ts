import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AvisUtilisateur {
  id?: number;

  // adapte les noms si ton entity a des noms différents
  commentaire?: string;
  note?: number;

  // relations / ids
  voitureId?: number;
  acheteurId?: number;

  // optionnel
  dateCreation?: string;
}

@Injectable({ providedIn: 'root' })
export class AvisService {
  private readonly API_URL = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  // ✅ tous les avis d'une voiture
  getByVoiture(voitureId: number): Observable<AvisUtilisateur[]> {
    return this.http.get<AvisUtilisateur[]>(
      `${this.API_URL}/api/avis/voiture/${voitureId}`,
      { withCredentials: true }
    );
  }

  // ✅ ajouter un avis (selon ton backend: POST /api/avis)
  addAvis(payload: AvisUtilisateur): Observable<AvisUtilisateur> {
    return this.http.post<AvisUtilisateur>(
      `${this.API_URL}/api/avis`,
      payload,
      { withCredentials: true }
    );
  }

  // optionnel: supprimer / modifier si tu veux
  deleteAvis(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/api/avis/${id}`, { withCredentials: true });
  }

  updateAvis(id: number, payload: AvisUtilisateur): Observable<AvisUtilisateur> {
    return this.http.put<AvisUtilisateur>(`${this.API_URL}/api/avis/${id}`, payload, { withCredentials: true });
  }
}
