import { Component } from "@angular/core";
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: "app-topbar",
  templateUrl: "./topbar.component.html",
})
export class TopbarComponent {
  constructor(private authService: AuthService, private router: Router) {}
  
  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }
}