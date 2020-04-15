import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CaseService } from '../../services/case.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-cases-add',
  templateUrl: './cases-add.component.html',
  styleUrls: ['./cases-add.component.scss']
})
export class CasesAddComponent implements OnInit {
  casesForm: FormGroup;
  name: '';
  gender: '';
  age: number = null;
  address: '';
  city: '';
  country: '';
  status: '';
  statusList = ['Positive', 'Dead', 'Recovered'];
  genderList = ['Male', 'Female'];
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();

  constructor(private router:Router, private flashMessageService:FlashMessagesService, private caseService:CaseService, private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.casesForm = this.formBuilder.group({
      name: [null, Validators.required],
      gender: [null, Validators.required],
      age: [null, Validators.required],
      address: [null, Validators.required],
      city: [null, Validators.required],
      country: [null, Validators.required],
      status: [null, Validators.required]
    });
  }

  onAddCaseSubmit() {
    this.isLoadingResults = true;
    this.caseService.addCases(this.casesForm.value)
      .subscribe((res: any) => {
        const id = res._id;
        this.isLoadingResults = false;
        this.router.navigate(['/cases-details', id]);
      }, (err: any) => {
        console.log(err);
        this.isLoadingResults = false;
      });

  }

}