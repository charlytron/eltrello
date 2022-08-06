import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { currentUser } from '../../../server/src/controllers/users';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe({
      
      next: (currentUser) => {
      this.authService.setCurrentUser(currentUser);
      },
      error: (err) => {
        console.log('err', err)
        this.authService.setCurrentUser(null)
      }
    })
  }
}

/* 
next: (res) => {
      console.log('res', res)
      },
*/
