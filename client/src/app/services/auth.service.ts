import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import 'rxjs/add/operator/map';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: HttpClient) { }

  registerUser(user): Observable<any> {
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>('http://localhost:3000/users/register', user, httpOptions);
  }

  authenticateUser(user): Observable<any> {
    let httpOptions = { headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }) };
    return this.http.post<any>('http://localhost:3000/users/authenticate', user, httpOptions);
  }

  getProfile(): Observable<any> {
    this.loadToken();
    let httpOptions = { headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authToken
    }) };
    return this.http.get<any>('http://localhost:3000/users/profile', httpOptions);
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
