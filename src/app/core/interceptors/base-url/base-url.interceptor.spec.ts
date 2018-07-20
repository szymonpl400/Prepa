import { TestBed, inject, getTestBed } from '@angular/core/testing';

import { BaseUrlInterceptor } from './base-url.interceptor';
import { AuthService } from '../../services/auth/auth.service';
import { AuthServiceMock } from '../../services/auth/auth.service.mock';
import * as appConfig from '../../../app.config.json';

describe('BaseUrlInterceptor', () => {
  let injector: TestBed;
  let interceptor: BaseUrlInterceptor;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BaseUrlInterceptor,
        {
          provide: AuthService,
          useClass: AuthServiceMock
        }
      ]
    });

    injector = getTestBed();
    interceptor = injector.get(BaseUrlInterceptor);
    authService = injector.get(AuthService);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should add base url when is authorized', () => {
    spyOn(authService, 'isAuthorized').and.returnValue(true);
    let result: { url: string};
    const req = {
      url: '/test',
      clone(obj) {
        return obj;
      }
    } as any;
    const next = {
      handle(obj) {
        result = obj;
      }
    } as any;

    interceptor.intercept(req, next);

    expect(result).toEqual({ url: appConfig['ApiBaseUrl'] + req.url });
  });
});
