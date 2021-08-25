import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './pages/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private authService: AuthService, private router: Router) {}

  onLogOut() {
    this.authService.logout();
    this.router.navigateByUrl('/auth');
  }
}
