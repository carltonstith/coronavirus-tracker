import { Injectable } from '@angular/core';
import { Observable, of, throwError, from } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Cases } from '../cases';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
const apiUrl = 'http://localhost:3000/cases'
// const apiUrl = '/cases/'

@Injectable({
  providedIn: 'root'
})
export class CaseService {
  data: Cases[] = [];

  constructor(private httpClient:HttpClient) { }

  // Error Handling
  private handleError<T> (operation = 'operation', result?: T) {
    return (error:any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }

  // Get All Cases
  getCases(): Observable<Cases[]> {
    return this.httpClient.get<Cases[]>(`${apiUrl}`)
      .pipe(
        tap(cases => console.log('fetched cases')),
        catchError(this.handleError('getCases', []))
      )
  }

  // Get a Single Case
  getCase(id): Observable<Cases> {
    const url = `${apiUrl}/${id}`;
    return this.httpClient.get<Cases>(url)
  }

  // Add Cases
  addCases(cases: Cases): Observable<Cases> {
    return this.httpClient.post<Cases>(`${apiUrl}`, cases, httpOptions);
  }

  // Update Case
  updateCase(data): Observable<any> {
    return this.httpClient.put(apiUrl, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Delets Case
  deleteCase(id: string): Observable<{}> {
    const url = `${apiUrl}/${id}`;
    return this.httpClient.delete(url,httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
}
