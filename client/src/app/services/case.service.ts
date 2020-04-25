import { Injectable } from '@angular/core';
import { Observable, of, throwError, from } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Cases } from '../cases';
import { Statistic } from '../statistics';

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

  // Add Case
  addCase(cases: Cases): Observable<Cases> {
    return this.httpClient.post<Cases>(`${apiUrl}`, cases, httpOptions);
  }

  updateCase(id: string,cases: Cases): Observable<any> {
    const url = `${apiUrl}/${id}`
    return this.httpClient.put<Cases>(url, cases, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Delete Case
  deleteCase(id: string): Observable<{}> {
    const url = `${apiUrl}/${id}`;
    return this.httpClient.delete<Cases>(url,httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Get Statistic
  getStatistic(status: string): Observable<Statistic> {
    const url = `${apiUrl}/daily/${status}`;
    return this.httpClient.get<Statistic>(url)
      .pipe(
        tap(_ => console.log(`Fetched statistic status=${status}`)),
        catchError(this.handleError<Statistic>(`getStatistic status=${status}`))
      );
  }

  //Get Coronavirus data for Statistics
  dailyCoronavirusStats() {
    return this.httpClient.get('https://covid-193.p.rapidapi.com/statistics', {
      'headers': {
        'x-rapidapi-host': 'covid-193.p.rapidapi.com',
        'x-rapidapi-key': '2ee3b3466dmshb7ce35c8436ac7fp1659fajsn31deba5949a2'
      }
    })
    .pipe(map(result => result));
  }

  // dailyForecast() {
  //   return this.httpClient.get("http://samples.openweathermap.org/data/2.5/history/city?q=Warren,OH&appid=b6907d289e10d714a6e88b30761fae22")
  //     .pipe(map(result => result))
  // }
}
