import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;

  constructor(
    private validateService: ValidateService,
    private flashMessageService: FlashMessagesService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  onRegisterSubmit() {
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    }

    // Required Fields
    if(!this.validateService.validateRegister(user)) {
      this.flashMessageService.show('Please fill in all fields', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    // Validate Email
    if(!this.validateService.validateEmail(user.email)) {
      this.flashMessageService.show('Please enter a valid email.', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    // Register User
    this.authService.registerUser(user).subscribe(data => {
      if(data.success) {
        this.flashMessageService.show('You are now registered and can log in.', {
          cssClass: 'alert-success',
          timeout: 3000 });
        this.router.navigate(['/login']);
      } else {
        this.flashMessageService.show('Something went wrong.', { cssClass: 'alert-danger', timeout: 3000 });
        this.router.navigate(['/register']);
      }
    });
  }

}