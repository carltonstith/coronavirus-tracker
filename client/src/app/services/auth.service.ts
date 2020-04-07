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

  // registerUser(user) {
  //   let headers = new HttpHeaders();
  //   headers.append('Content-Type', 'application/json');
  //   return this.http.post('http://localhost:3000/users/register', user, {headers:headers})
  //     .map(res => res.json());
  // }
  registerUser(user): Observable<any> {
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>('http://localhost:3000/users/register', user, httpOptions);
  }
}
