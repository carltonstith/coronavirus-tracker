import { Component, OnInit } from '@angular/core';
import { CaseService } from '../../services/case.service';
import { Statistic } from '../../statistics';
import { Label } from 'ng2-charts';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  public checkboxGroupForm: FormGroup;

  stats: Statistic[] = [];
  label = 'Recovered';
  isLoadingResults = true;
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  barChartData: ChartDataSets[] = [{ data: [], backgroundColor: [], label: this.label }];

  constructor(private caseService:CaseService,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getStatisticData(this.label);
    this.checkboxGroupForm = this.formBuilder.group({
      confirmed: true,
      dead: false,
      recovered: false
    })
  }

  getStatisticData(status: string) {
    this.barChartData = [{ data: [], backgroundColor: [], label: this.label }];
    this.barChartLabels = [];
    this.caseService.getStatistic(status)
      .subscribe((res: any) => {
        this.stats = res;
        console.log(res)
        const chartdata: number[] = [];
        const chartcolor: string[] = [];
        this.stats.forEach((stat) => {
          this.barChartLabels.push(stat._id.date);
          chartdata.push(stat.count);
          if(this.label === 'Recovered') {
            chartcolor.push('rgba(255,165,0,0.5)');
          } else if(this.label === 'Dead') {
            chartcolor.push('rgba(255,0,0,0.5)');
          } else {
            chartcolor.push('rgba(0,255,0,0.5)');
          }
        });
        this.barChartData = [{ data: chartdata, backgroundColor: chartcolor, label: this.label }];
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

  changeStatus() {
    this.isLoadingResults = true;
    this.getStatisticData(this.label);
  }

}
