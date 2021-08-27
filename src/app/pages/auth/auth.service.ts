import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userIsAuthenticated = true;

  get userIsAuthenticatedMethod() {
    return this.userIsAuthenticated;
  }

  constructor() {}

  login() {
    this.userIsAuthenticated = true;
  }

  logout() {
    this.userIsAuthenticated = false;
  }
}
