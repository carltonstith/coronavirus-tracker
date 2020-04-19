import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CaseService } from '../../services/case.service';
import { Cases } from '../../cases';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { FlashMessagesService } from 'angular2-flash-messages';

/** Error when invalid control is dirty, touched, or submitted */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-cases-edit',
  templateUrl: './cases-edit.component.html',
  styleUrls: ['./cases-edit.component.scss']
})
export class CasesEditComponent implements OnInit {

  casesForm: FormGroup;
  _id = '';
  name = '';
  gender = '';
  age: number = null;
  address = '';
  city = '';
  country = '';
  status: '';
  statusList = ['Positive', 'Dead', 'Recovered'];
  genderList = ['Male', 'Female'];
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();

  constructor(private route:ActivatedRoute,private router:Router, private flashMessageService:FlashMessagesService, private caseService:CaseService, private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.getCasesById(this.route.snapshot.params['id']);
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

  getCasesById(id: any) {
    this.caseService.getCase(id)
      .subscribe((data: any) => {
        this._id = data._id;
        this.casesForm.setValue({
          name: data.name,
          gender: data.gender,
          age: data.age,
          address: data.address,
          city: data.city,
          country: data.country,
          status: data.status
        });
      });
  }

  onFormSubmit() {
    //console.log(this.casesForm.value);
    this.isLoadingResults = true;
    this.caseService.updateCase(this._id, this.casesForm.value)
      .subscribe((res: any) => {
        let id = res._id;
        this.router.navigate(['/cases-details', id]);
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      })
  }

}
