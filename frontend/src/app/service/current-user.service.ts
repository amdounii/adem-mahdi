import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface CurrentUser {
  id: number;
  nom?: string;
  role?: string;
  email?: string;
  telephone?: string;
}

@Injectable({ providedIn: 'root' })
export class CurrentUserService {
  private userSubject = new BehaviorSubject<CurrentUser | null>(null);

  get user$(): Observable<CurrentUser | null> {
    return this.userSubject.asObservable();
  }

  get snapshot(): CurrentUser | null {
    return this.userSubject.getValue();
  }

  set(user: CurrentUser | null) {
    this.userSubject.next(user);
  }

  clear() {
    this.userSubject.next(null);
  }
}
