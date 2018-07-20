import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from '../../services/auth/auth.service';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>  {
    if (this.authService.isAuthorized()) {
      req = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + this.authService.getToken())
      });
    }

    return next.handle(req);
  }
}
