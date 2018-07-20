import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    if (!this.authService.isAuthorized()) {
      this.authService.authorize()
        .subscribe(data => {
          if (data.success) {
            this.authService.saveCredential(data);
          } else {
            throw new Error('Authorization failed!');
          }
        });
    }
  }
}
