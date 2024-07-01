import { Component } from '@angular/core';
import { AuthorizationService } from 'src/app/shared/authorization-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {
  constructor(
    private auth:AuthorizationService,
    private router:Router) {
    this.auth.changed.subscribe(result => {
      if (!result)
        this.router.navigate(["/login"]);
    });
    this.auth.logout();
  }
}