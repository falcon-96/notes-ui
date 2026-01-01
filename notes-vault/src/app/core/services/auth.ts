import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  constructor(private http: HttpClient) {

  }
  API_URL: string = 'http://localhost:8080';
  login(email: string, password: string): Observable<any> {
    return this.http.post(this.API_URL + '/auth/login', {
      "username": email,
      "password": password
    }
    );
  }

  register(email: string, password: string, firstName: string, middleName: string, lastName: string): Observable<any> {
    return this.http.post(this.API_URL + '/auth/register', {
      "firstName": firstName,
      "middleName": middleName,
      "lastName": lastName,
      "email": email,
      "password": password
    }
    );
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return localStorage.getItem('token') !== null;
  }
}
