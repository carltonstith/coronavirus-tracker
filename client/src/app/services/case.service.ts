import { Injectable } from '@angular/core';
import { Observable, of, throwError, from } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Cases } from '../cases';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'localhost:3000/cases/'
  })
};
const apiUrl = 'http://localhost:3000/cases/'

@Injectable({
  providedIn: 'root'
})
export class CaseService {

  constructor(private httpClient:HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error:any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }

  // getCases(): Observable<Cases[]> {
  //   return this.httpClient.get<Cases[]>(`${apiUrl}`)
  //     .pipe(
  //       tap(cases => console.log('fetched cases')),
  //       catchError(this.handleError('getCases', []))
  //     );
  // }

  // Get All Cases
  getCases(): Observable<Cases[]> {
    return this.httpClient.get<Cases[]>(`${apiUrl}`, httpOptions);
  }

  // Add Cases
  addCases(cases: Cases): Observable<Cases> {
    return this.httpClient.post<Cases>(apiUrl, cases, httpOptions);
  }
}
