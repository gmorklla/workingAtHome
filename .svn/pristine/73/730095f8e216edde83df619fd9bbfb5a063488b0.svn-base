import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Observable, of, empty, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor() {}

  setSession(token: string): Observable<Boolean> {
    const user = this.parseJwt(token);
    localStorage.setItem('token', token);
    localStorage.setItem('expires', JSON.stringify(user.exp));
    this.user$.next(user);
    return of(true);
  }

  getUser(): void {
    const token = localStorage.getItem('token');
    const user = token ? this.parseJwt(token) : null;
    this.user$.next(user);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expires');
    this.user$.next(null);
  }

  parseJwt(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }

  parseJwtDate(date: number) {
    return new Date(date * 1000);
  }
}
