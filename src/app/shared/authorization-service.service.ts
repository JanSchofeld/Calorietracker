import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' 
})

export class AuthorizationService {
  private is_logged_in:boolean = false;

  isLoggedIn() {
    return this.is_logged_in;
  }

  changed:EventEmitter<boolean> = new EventEmitter<boolean>();

  login(username:string, password:string):boolean {
    if(username == 'admin' && password == 'test') {
      this.is_logged_in = true;
      this.changed.emit(true);
      return true;
    } else {
      return false;
    }
  }

  async logout() {
    this.is_logged_in = false;
    this.changed.emit(false);
  }

  constructor() { }
}