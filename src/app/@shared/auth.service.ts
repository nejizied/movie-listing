import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient, private router: Router) {}

  login(username: string, password: string): any {
    return this.httpClient.get(`${environment.serverUrl}/users?username=${username}&password=${password}`).toPromise();
  }
  register(query: any): any {
    return this.httpClient.post(`${environment.serverUrl}/users`, { ...query, isAdmin: false }).toPromise();
  }

  get loggedInUser() {
    return localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
  }

  logout() {
    this.router.navigate(['/login']);
  }

  isAdmin() {
    return JSON.parse(localStorage.getItem('user')).isAdmin;
  }
}
