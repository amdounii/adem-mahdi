import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Voiture {
  id: number;
  marque: string;
  modele: string;
  annee?: number;
  kilometrage?: number;
  prixVendeur?: number;
  statut?: string;
  vendeurId?: number;
  description?: string;
  images?: string[];
}

export interface EstimationSysteme {
  id: number;
  voitureId: number;
  prixEstime: number;
  avisAuto: string;
}

@Injectable({ providedIn: 'root' })
export class VoitureService {
    
  private readonly API_URL = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Voiture[]> {
    return this.http.get<Voiture[]>(
      `${this.API_URL}/api/voitures`,
      { withCredentials: true }
    );
  }
  getByVendeur(vendeurId: number): Observable<Voiture[]> {
  return this.http.get<Voiture[]>(
    `${this.API_URL}/api/voitures/vendeur/${vendeurId}`,
    { withCredentials: true }
  );
}


  search(marque?: string, modele?: string): Observable<Voiture[]> {
    const params: any = {};
    if (marque) params.marque = marque;
    if (modele) params.modele = modele;

    return this.http.get<Voiture[]>(
      `${this.API_URL}/api/voitures/search`,
      { params, withCredentials: true }
    );
  }

  getById(id: number): Observable<Voiture> {
    return this.http.get<Voiture>(
      `${this.API_URL}/api/voitures/${id}`,
      { withCredentials: true }
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.API_URL}/api/voitures/${id}`,
      { withCredentials: true }
    );
  }
  create(data: Partial<Voiture>) {
  return this.http.post<Voiture>(
    `${this.API_URL}/api/voitures`,
    data,
    { withCredentials: true }
  );
}
update(id: number, data: Partial<Voiture>) {
  return this.http.put<Voiture>(
    `${this.API_URL}/api/voitures/${id}`,
    data,
    { withCredentials: true }
  );
}

  // optionnel : récupérer l’estimation
  getEstimationByVoitureId(id: number): Observable<EstimationSysteme> {
    return this.http.get<EstimationSysteme>(
      `${this.API_URL}/api/estimations/voiture/${id}`,
      { withCredentials: true }
    );
  }

}
