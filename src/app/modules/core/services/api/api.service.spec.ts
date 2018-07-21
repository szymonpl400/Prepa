import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ApiService } from './api.service';
import { AuthService } from '../auth/auth.service';
import { AuthServiceMock } from '../auth/auth.service.mock';
import { AuthQueueService } from '../auth-queue/auth-queue.service';
import { AuthQueueServiceMock } from '../auth-queue/auth-queue.service.mock';
import { Observable } from 'rxjs';

describe('ApiService', () => {
    const apiBaseUrl = 'https://api.spotify.com/v1/';
    let injector: TestBed;
    let service: ApiService;
    let authService: AuthService;
    let authQueueService: AuthQueueService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                ApiService,
                {
                    provide: AuthService,
                    useClass: AuthServiceMock
                },
                {
                    provide: AuthQueueService,
                    useClass: AuthQueueServiceMock
                }
            ]
        });

        injector = getTestBed();
        service = injector.get(ApiService);
        authService = injector.get(AuthService);
        authQueueService = injector.get(AuthQueueService);
        httpMock = injector.get(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('#get', () => {
        it('should call api request when we are authorized', () => {
            const url = 'testurl';
            const expected = { test: 'test' };
            spyOn(authService, 'isAuthorized').and.returnValue(true);

            service.get(url)
                .subscribe(res => {
                    expect(res).toEqual(expected);
                });
            httpMock.expectOne(apiBaseUrl + url).flush(expected);
        });

        it('should authorize if not authorized', () => {
            spyOn(authService, 'isAuthorized').and.returnValue(false);
            spyOn(authService, 'authorize').and.returnValue({
                subscribe() {
                }
            });

            service.get('test');

            expect(authService.authorize).toHaveBeenCalled();
        });

        it('should add request to que if not authorized', () => {
            spyOn(authService, 'isAuthorized').and.returnValue(false);
            spyOn(authService, 'authorize').and.returnValue({
                subscribe() {
                }
            });
            spyOn(authQueueService, 'addRequest');

            service.get('test');

            expect(authQueueService.addRequest).toHaveBeenCalled();
        });

        it('should throw error if authorize is not successful', () => {
            spyOn(authService, 'isAuthorized').and.returnValue(false);
            spyOn(authService, 'authorize').and.returnValue({
                subscribe(callback) {
                    callback({ success: false });
                }
            });

            expect(() => service.get('test')).toThrowError('Authorization failed!');
        });

        it('should save credential after succesful authorize', () => {
            const expectedCall = { success: true };
            spyOn(authService, 'isAuthorized').and.returnValue(false);
            spyOn(authService, 'authorize').and.returnValue({
                subscribe(callback) {
                     callback(expectedCall);
                }
            });
            spyOn(authService, 'saveCredential');
            spyOn(authQueueService, 'releaseRequests').and.returnValue([]);

            service.get('test');

            expect(authService.saveCredential).toHaveBeenCalledWith(expectedCall);
        });

        it('should emit request for each stopped request', () => {
            const res = 'test';
            const template = {
                source: {
                    next(val) {
                    }
                },
                apiRequest() {
                    return {
                        subscribe(callback) {
                            callback(res);
                        }
                    };
                }
            };
            const requests = [
                Object.assign({}, template),
                Object.assign({}, template),
                Object.assign({}, template)
            ];
            spyOn(authService, 'isAuthorized').and.returnValue(false);
            spyOn(authService, 'authorize').and.returnValue({
                subscribe(callback) {
                     callback({ success: true });
                }
            });
            spyOn(authQueueService, 'releaseRequests').and.returnValue(requests);
            spyOn(template.source, 'next');

            service.get('test');

            requests.forEach(request => {
                expect(request.source.next).toHaveBeenCalledWith(res);
            });
        });

        it('should not call authorize when it is already called', () => {
            spyOn(authService, 'isAuthorized').and.returnValue(false);
            spyOn(authService, 'authorize').and.returnValue({
                subscribe() {
                }
            });

            service.get('test');
            service.get('test');

            expect(authService.authorize).toHaveBeenCalledTimes(1);
        });

        it('should return observable when not authorized', () => {
            spyOn(authService, 'isAuthorized').and.returnValue(false);
            spyOn(authService, 'authorize').and.returnValue({
                subscribe() {
                }
            });

            expect(service.get('test') instanceof Observable).toBeTruthy();
        });
    });
});
