import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-cases-add',
  templateUrl: './cases-add.component.html',
  styleUrls: ['./cases-add.component.scss']
})
export class CasesAddComponent implements OnInit {
  name: String;
  gender: String;
  age: Number;
  address: String;
  city: String;
  country: String;
  status: String;

  constructor(private router:Router, private flashMessageService:FlashMessagesService) { }

  ngOnInit(): void {
  }

  onAddCaseSubmit() {
    const singleCase = {
      name: this.name,
      gender: this.gender,
      age: this.age,
      address: this.address,
      city: this.city,
      country: this.country,
      status: this.status
    }
    console.log(singleCase)

  }

}
