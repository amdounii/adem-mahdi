import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Utilisateur {
  id: number;
  nom?: string;
  email?: string;
  role?: string;
  telephone?: string;
}

@Injectable({ providedIn: 'root' })
export class UtilisateurService {
  private readonly API_URL = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(`${this.API_URL}/api/utilisateurs`, { withCredentials: true });
  }

  getById(id: number): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(`${this.API_URL}/api/utilisateurs/${id}`, { withCredentials: true });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/api/utilisateurs/${id}`, { withCredentials: true });
  }

getPublicById(id: number): Observable<Utilisateur> {
  return this.http.get<Utilisateur>(
    `${this.API_URL}/api/utilisateurs/public/${id}`,
    { withCredentials: true }
  );
}




}
