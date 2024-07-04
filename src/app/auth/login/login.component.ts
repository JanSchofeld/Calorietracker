import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorizationService } from 'src/app/shared/authorization-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup = new FormGroup({
    username: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required])
  })

  login_error: boolean = false;

  onSubmit() {
    let username = this.loginForm.controls['username'].value;
    let password = this.loginForm.controls['password'].value;
    
    if (this.auth.login(username, password)) {
      this.router.navigateByUrl('/profile');
    }
    else {
      this.login_error = true;
    }
  }

  constructor(
    private auth: AuthorizationService,
    private router: Router
  ) {}
}