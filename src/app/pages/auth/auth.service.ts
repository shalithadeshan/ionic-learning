import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userIsAuthenticated = true;
  private userID = 'xyz';

  get userIsAuthenticatedMethod() {
    return this.userIsAuthenticated;
  }

  get userId() {
    return this.userID;
  }

  constructor() {}

  login() {
    this.userIsAuthenticated = true;
  }

  logout() {
    this.userIsAuthenticated = false;
  }
}
