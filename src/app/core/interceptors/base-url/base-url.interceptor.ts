import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

import * as appConfig from '../../../app.config.json';
import { AuthService } from '../../services/auth/auth.service';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
  private readonly baseUrl = appConfig['ApiBaseUrl'];

  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.isAuthorized()) {
      req = req.clone({ url: this.baseUrl + req.url });
    }
    return next.handle(req);
  }
}
