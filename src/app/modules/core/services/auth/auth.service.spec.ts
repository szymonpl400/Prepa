import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';
import { DateHelperService, TypeHelperService } from '../../../shared/shared.module';

describe('AuthService', () => {
    let injector: TestBed;
    let service: AuthService;
    let httpMock: HttpTestingController;
    let typeHelper: jasmine.SpyObj<TypeHelperService>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                AuthService,
                {
                    provide: DateHelperService,
                    useFactory: () => (
                        jasmine.createSpyObj('DateHelperService', ['secondsToMiliseconds'])
                    )
                },
                {
                    provide: TypeHelperService,
                    useFactory: () => (
                        jasmine.createSpyObj('TypeHelperService', ['isNumber'])
                    )
                }
            ]
        });

        injector = getTestBed();
        service = injector.get(AuthService);
        httpMock = injector.get(HttpTestingController);
        typeHelper = injector.get(TypeHelperService);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('authorize', () => {
        it('should GET /auth', () => {
            service.authorize().subscribe();
            expect(httpMock.expectOne('/auth').request.method).toBe('GET');
        });

        it('should return Observable', () => {
            expect(service.authorize() instanceof Observable).toBeTruthy();
        });
    });

    describe('isAuthorized', () => {
        it('should return false when access_token or expires_in is absent in storage', () => {
            spyOn(localStorage, 'getItem').and.returnValue(null);
            expect(service.isAuthorized()).toBeFalsy();
        });

        it('should return false when access_token is valid and expires_in is absent', () => {
            typeHelper.isNumber.and.returnValue(false);
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
            typeHelper.isNumber.and.returnValue(true);
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

    describe('saveCredential', () => {
        it('should save access token', () => {
            spyOn(localStorage, 'setItem');
            const credential = { success: true, accessToken: 'data', expiresIn: Date.now() };
            service.saveCredentials(credential);
            expect(localStorage.setItem).toHaveBeenCalledWith(service.accessTokenName, credential.accessToken);
        });

        it('should save expires in', () => {
            spyOn(localStorage, 'setItem');
            const credential = { success: true, accessToken: 'data', expiresIn: Date.now() };
            service.saveCredentials(credential);
            expect(localStorage.setItem).toHaveBeenCalledWith(service.expiresInName, JSON.stringify(credential.expiresIn));
        });
    });

    describe('getToken', () => {
        it('should return token', () => {
            const expected = 'test';
            spyOn(localStorage, 'getItem').and.callFake(key => key === service.accessTokenName ? expected : null);
            expect(service.getToken()).toBe(expected);
        });
    });

    describe('clearCredentials', () => {
        it('should remove credentials from storage', () => {
            spyOn(localStorage, 'removeItem');

            service.clearCredentials();

            expect(localStorage.removeItem).toHaveBeenCalledWith('access_token');
            expect(localStorage.removeItem).toHaveBeenCalledWith('expires_in');
        });
    });
});
