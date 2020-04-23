import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.getCovid19Data()
  }

  getCovid19Data() {
    fetch('https://covid-193.p.rapidapi.com/statistics', {
      'method': 'GET',
      'headers': {
        'x-rapidapi-host': 'covid-193.p.rapidapi.com',
        'x-rapidapi-key': '2ee3b3466dmshb7ce35c8436ac7fp1659fajsn31deba5949a2'
      }
    })
    .then(function(res) {
      return res.json();
    })
    .then(function(data) {
      //console.log(data.response)
      let output = '';
      data.response.forEach(function(statistics) {
        output += `
        <tr>
        <td>${statistics.country}</td>
        <td>${statistics.cases.total}</td>
        <td>${statistics.cases.new}</td>
        <td>${statistics.cases.active}</td>
        <td>${statistics.cases.critical}</td>
        <td>${statistics.cases.recovered}</td>
        <td>${statistics.deaths.new}</td>
        <td>${statistics.deaths.total} </td>
        </tr>
        `
      });
      document.getElementById('output').innerHTML = output;
    })
    .catch(function(err) {
      console.log(err);
    })
  }

}
