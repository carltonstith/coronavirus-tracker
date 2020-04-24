import { Component, OnInit } from '@angular/core';
import { CaseService } from '../../services/case.service';
import { Statistic } from '../../statistics';
import { Label } from 'ng2-charts';
import { Chart, ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  chart: any;
  cases;

  constructor(private caseService:CaseService) { }

  ngOnInit() {
    this.caseService.dailyCoronavirusStats()
      .subscribe((data) => {
        this.cases = data['response']
        console.log(this.cases)
      })

    this.caseService.dailyForecast()
      .subscribe(res => {

        let temp_max = res['list'].map(res => res.main.temp_max)
        let temp_min = res['list'].map(res => res.main.temp_min)
        let alldates = res['list'].map(res => res.dt)

        let weatherDates = []
        alldates.forEach((res) => {
          let jsdate = new Date(res * 1000)
          weatherDates.push(jsdate.toLocaleTimeString('en', { year: 'numeric', month: 'short', day: 'numeric'}))
        })

        this.chart = new Chart('canvas', {
          type: 'line',
          data: {
            labels: weatherDates,
            datasets: [
              {
                data: temp_max,
                borderColor: '#3cba9f',
                fill: false
              },
              {
                data: temp_min,
                borderColor: '#ffcc00',
                fill: false
              },
            ]
          },
          options: {
            legend: {
              display: false
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }]
            }
          }
        })

      })
  }



}
