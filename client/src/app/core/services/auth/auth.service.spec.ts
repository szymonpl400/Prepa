import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let injector: TestBed;
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });

    injector = getTestBed();
    service = injector.get(AuthService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#authorize', () => {
    it('should GET /auth', () => {
      service.authorize().subscribe();
      const req = httpMock.expectOne('/auth');
      expect(req.request.method).toBe('GET');
    });

    it('should return Observable', () => {
      expect(service.authorize() instanceof Observable).toBeTruthy();
    });

    it('should map expiresIn time to date', () => {
      const dummyData = {
        success: true,
        accessToken: 'token',
        expiresIn: 3600
      };

      service.authorize().subscribe(credential => {
        expect(credential.expiresIn instanceof Date).toBeTruthy();
      });

      const req = httpMock.expectOne('/auth');
      req.flush(dummyData);
    });
  });

  describe('#isAuthorized', () => {
    it('should return false when access_token or expires_in is absent in storage', () => {
      spyOn(localStorage, 'getItem').and.returnValue(null);
      expect(service.isAuthorized()).toBeFalsy();
    });

    it('should return false when access_token is valid and expires_in is absent', () => {
      spyOn(localStorage, 'getItem').and.callFake((key) => {
        switch (key) {
          case service.accessTokenName:
            return 'data';
          case service.expiresInName:
            return null;
          default:
            return null;
        }
      });
      expect(service.isAuthorized()).toBeFalsy();
    });

    it('should return false when expires_in is obsolete', () => {
      const yesterday = new Date().setDate(new Date().getDate() - 1);
      spyOn(localStorage, 'getItem').and.callFake((key) => {
        switch (key) {
          case service.accessTokenName:
            return 'data';
          case service.expiresInName:
            return JSON.stringify(yesterday);
          default:
            return null;
        }
      });
      expect(service.isAuthorized()).toBeFalsy();
    });

    it('should return true when access_token is present and expires_in is valid', () => {
      const tommorow = new Date().setDate(new Date().getDate() + 1);
      spyOn(localStorage, 'getItem').and.callFake((key) => {
        switch (key) {
          case service.accessTokenName:
            return 'data';
          case service.expiresInName:
            return JSON.stringify(tommorow);
          default:
            return null;
        }
      });
      expect(service.isAuthorized()).toBeTruthy();
    });
  });

  describe('#saveCredential', () => {
    it('should save access token', () => {
      spyOn(localStorage, 'setItem');
      const credential = { success: true, accessToken: 'data', expiresIn: new Date() };
      service.saveCredential(credential);
      expect(localStorage.setItem).toHaveBeenCalledWith(service.accessTokenName, credential.accessToken);
    });

    it('should save expires in', () => {
      spyOn(localStorage, 'setItem');
      const credential = { success: true, accessToken: 'data', expiresIn: new Date() };
      service.saveCredential(credential);
      expect(localStorage.setItem).toHaveBeenCalledWith(service.expiresInName, JSON.stringify(credential.expiresIn));
    });
  });

  describe('#getToken', () => {
    it('should return token', () => {
      const expected = 'test';
      spyOn(localStorage, 'getItem').and.callFake(key => key === service.accessTokenName ? expected : null);
      expect(service.getToken()).toBe(expected);
    });
  });
});
