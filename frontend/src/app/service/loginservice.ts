import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Loginservice {

  // 🔹 URL du backend (Spring Boot)
  private readonly API_URL = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  // 🔐 LOGIN
  login(email: string, motDePasse: string, role: string) {
    return this.http.post<any>(
      `${this.API_URL}/auth/login`,
      { email, motDePasse, role },
      { withCredentials: true }
    );
  }

  // 🚪 LOGOUT
  logout() {
    return this.http.post<void>(
      `${this.API_URL}/auth/logout`,
      {},
      { withCredentials: true }
    );
  }

  // 👤 CHECK SESSION (optionnel)
  me() {
    return this.http.get<any>(
      `${this.API_URL}/auth/me`,
      { withCredentials: true }
    );
  }
  profile() {
  return this.http.get<any>(
    `${this.API_URL}/auth/profile`,
    { withCredentials: true }
  );
}

}
