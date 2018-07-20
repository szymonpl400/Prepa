import { TestBed, inject, getTestBed } from '@angular/core/testing';

import { AuthTokenInterceptor } from './auth-token.interceptor';
import { AuthService } from '../../services/auth/auth.service';
import { AuthServiceMock } from '../../services/auth/auth.service.mock';

describe('AuthTokenInterceptor', () => {
  let injector: TestBed;
  let interceptor: AuthTokenInterceptor;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthTokenInterceptor,
        {
          provide: AuthService,
          useClass: AuthServiceMock
        }
      ]
    });

    injector = getTestBed();
    interceptor = injector.get(AuthTokenInterceptor);
    authService = injector.get(AuthService);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should add token to request when is authorized', () => {
    spyOn(authService, 'isAuthorized').and.returnValue(true);
    spyOn(authService, 'getToken').and.returnValue('test');
    let result: { key: string, value: string };
    const req = {
      headers: {
        set(key, value) {
          result = { key, value };
        }
      },
      clone(obj) {
        return obj;
      }
    } as any;
    const next = {
      handle() {
      }
    } as any;

    interceptor.intercept(req, next);

    expect(result).toEqual({ key: 'Authorization', value: 'Bearer ' + 'test' });
  });
});
