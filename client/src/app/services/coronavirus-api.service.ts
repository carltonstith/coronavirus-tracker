import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoronavirusApiService {

  constructor(private http:HttpClient) { }

  getCoronavirusData() {
    console.log('getting all data');
    return this.http.get('https://api.covid19api.com/countries');
  }
}
