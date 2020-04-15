import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CaseService } from '../../services/case.service';
import { Cases } from '../../cases';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-cases-details',
  templateUrl: './cases-details.component.html',
  styleUrls: ['./cases-details.component.scss']
})
export class CasesDetailsComponent implements OnInit {

  cases: Cases = {
    _id: '',
    name: '',
    gender: '',
    age: null,
    address: '',
    city: '',
    country: '',
    status: '',
    updated: null
  };
  isLoadingResults = true;

  constructor(private route:ActivatedRoute, private caseService:CaseService, private router:Router) { }

  ngOnInit(): void {
    this.getCasesDetails(this.route.snapshot.params.id);
  }

  getCasesDetails(id: string) {
    this.caseService.getCasesById(id)
      .subscribe((data: any) => {
        this.cases = data;
        console.log(this.cases);
        this.isLoadingResults = false;
      });
  }

  deleteCases(id: any) {
    this.isLoadingResults = true;
    this.caseService.deleteCases(id)
      .subscribe(res => {
        this.isLoadingResults = false;
        this.router.navigate(['/cases']);
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      })
  }

}
