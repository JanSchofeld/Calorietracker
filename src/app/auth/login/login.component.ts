import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from 'src/app/shared/authorization-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  @ViewChild('username')
  usernameElement!: ElementRef;

  @ViewChild('password')
  passwordElement!: ElementRef;

  login_error: boolean = false;

  onSubmit() {
    let username = this.usernameElement.nativeElement.value;
    let password = this.passwordElement.nativeElement.value;
    
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
  ) {
    this.auth.changed.subscribe((result) => {
      if (result)
        this.router.navigate(['/calories']);
    }
    )
  }
}