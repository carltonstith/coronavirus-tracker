import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) { }

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

  loggedIn(){
    const token: any = localStorage.getItem('id_token');
    if(token == null || token == undefined) {
      this.jwtHelper.isTokenExpired()
      return false;
    } else {
      !this.jwtHelper.isTokenExpired()
      return true;
    }

    // if(this.authToken != null){return true;}
    // else{return false;}

    //   if (localStorage.id_token == undefined ){
    //    console.log('Hello');
    //    return false
    //   } else {
    //   console.log('Goodbye');
    // const helper = new JwtHelperService();
    // console.log(helper.isTokenExpired(localStorage.id_token));
    //   return helper.isTokenExpired(localStorage.id_token); // other people are putting 'id_token'' here but it didn't work for me so i just put the localStorage item
    //   }
   }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
