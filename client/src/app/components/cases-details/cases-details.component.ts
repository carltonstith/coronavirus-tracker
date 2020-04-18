import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CaseService } from '../../services/case.service';
import { Cases } from '../../cases';

@Component({
  selector: 'app-cases-details',
  templateUrl: './cases-details.component.html',
  styleUrls: ['./cases-details.component.scss']
})
export class CasesDetailsComponent implements OnInit {

  data: Cases = {
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

  ngOnInit() {
    this.getCaseDetails(this.route.snapshot.params['id']);
    //debugger
  }

  getCaseDetails(id) {
    this.caseService.getCase(id)
      .subscribe(data => {
        this.data = data;
        console.log(data);
        this.isLoadingResults = false;
      });
  }

}
