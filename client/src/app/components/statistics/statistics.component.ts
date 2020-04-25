import { Component, OnInit, Output } from '@angular/core';
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
      .subscribe(res => {

        let country = res['response'].map(res => res.country)
        console.log(country);

        let newCases = res['response'].map(res => res.cases.new)
        console.log(newCases);

        let activeCases = res['response'].map(res => res.cases.active)
        console.log(activeCases)

        let criticalCases = res['response'].map(res => res.cases.critical)
        console.log(criticalCases)

        let recoveredCases = res['response'].map(res => res.cases.recovered)
        console.log(recoveredCases)

        let totalCases = res['response'].map(res => res.cases.total)
        console.log(totalCases)

        let newDeaths = res['response'].map(res => res.deaths.new)
        console.log(newDeaths)

        let totalDeaths = res['response'].map(res => res.deaths.total)
        console.log(totalDeaths)

        let totalTests = res['response'].map(res => res.tests.total)
        console.log(totalTests)

        let day = res['response'].map(res => res.day)
        console.log(day)

        let time = res['response'].map(res => res.time)
        console.log(time)


        this.chart = new Chart('canvas', {
          type: 'line',
          data: {
            labels: day,
            datasets: [
              {
                data: country,
                borderColor: '#3cba9f',
                fill: false
              },
              {

                data: newCases,
                borderColor: '#ffcc00',
                fill: false
              },
              {
                data: activeCases,
                borderColor: '#4C9BFB',
                fill: false
              }
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
        // this.cases = data['response']
        // console.log(this.cases)

        // this.cases.forEach((res) => {
        //   this.chart = new Chart('canvas', {
        //     type: 'line',
        //     data: {
        //       labels:
        //     }
        //   })
        // })
      })

    // this.caseService.dailyForecast()
    //   .subscribe(res => {

    //     let temp_max = res['list'].map(res => res.main.temp_max)
    //     let temp_min = res['list'].map(res => res.main.temp_min)
    //     let alldates = res['list'].map(res => res.dt)

    //     let weatherDates = []
    //     alldates.forEach((res) => {
    //       let jsdate = new Date(res * 1000)
    //       weatherDates.push(jsdate.toLocaleTimeString('en', { year: 'numeric', month: 'short', day: 'numeric'}))
    //     })

    //     this.chart = new Chart('canvas', {
    //       type: 'line',
    //       data: {
    //         labels: weatherDates,
    //         datasets: [
    //           {
    //             data: temp_max,
    //             borderColor: '#3cba9f',
    //             fill: false
    //           },
    //           {
    //             data: temp_min,
    //             borderColor: '#ffcc00',
    //             fill: false
    //           },
    //         ]
    //       },
    //       options: {
    //         legend: {
    //           display: false
    //         },
    //         scales: {
    //           xAxes: [{
    //             display: true
    //           }],
    //           yAxes: [{
    //             display: true
    //           }]
    //         }
    //       }
    //     })

    //   })
  }



}
