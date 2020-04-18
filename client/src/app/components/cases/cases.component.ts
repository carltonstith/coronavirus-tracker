import { Component, OnInit } from '@angular/core';
import { CaseService } from '../../services/case.service';
import { Cases } from '../../cases';

@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.scss']
})
export class CasesComponent implements OnInit {

  displayedColums: string[] = ['name', 'age', 'status'];
  data: Cases[] = [];
  isLoadingResults = true;

  constructor(private caseService:CaseService) { }

  ngOnInit(): void {
    this.caseService.getCases()
    .subscribe((res: any) => {
      this.data = res;
      // console.log(this.data);
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    })
  }

}
