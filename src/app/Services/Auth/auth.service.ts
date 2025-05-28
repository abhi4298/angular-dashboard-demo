import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { config } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = config.baseUrl;

  tokenKey = "user";

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    let token = localStorage.getItem(this.tokenKey);
    return token != null && token.length > 0;
  }

  getToken(): string | null {
    return this.isLoggedIn() ? localStorage.getItem(this.tokenKey) : null;
  }


  refreshToken() {
    let url = this.baseUrl + "/api/auth/refresh-token";
    return this.http.post<any>(url, {}, { withCredentials: true });
  }

  login(email: string, password: string): Observable<string> {
    return this.http.post(
      this.baseUrl + '/api/auth/login',
      {
        email: email,
        password: password,
      },
      { responseType: 'text', withCredentials: true }
    );
  }

  register(
    firstName: string,
    lastName: string,
    phoneNumber: string,
    email: string,
    password: string
  ): Observable<string> {
    return this.http.post(
      this.baseUrl + '/api/auth/sign-up',
      {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber,
        password: password,
      },
      { responseType: 'text' }
    );
  }
}
