import { TestBed, getTestBed, fakeAsync, tick } from '@angular/core/testing';
import { Observable, Subject, of } from 'rxjs';

import { ApiAuthorizationService } from './api-authorization.service';
import { AuthService } from '../auth/auth.service';
import { AuthServiceMock } from '../../mocks/auth.service.mock';
import { AuthQueueService } from '../auth-queue/auth-queue.service';
import { AuthQueueServiceMock } from '../../mocks/auth-queue.service.mock';
import { HttpGetServiceMock } from '../../mocks/http-get.service.mock';
import { HttpOptions } from '../../interfaces/http-options';
import { HttpMethod } from '../../interfaces/http-method';
import { AuthQueueRequest } from '../../interfaces/auth-queue-request';


describe('ApiAuthorizationService', () => {
    let injector: TestBed;
    let service: ApiAuthorizationService;
    let authService: AuthService;
    let authQueueService: AuthQueueService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ApiAuthorizationService,
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
        service = injector.get(ApiAuthorizationService);
        authService = injector.get(AuthService);
        authQueueService = injector.get(AuthQueueService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('handle', () => {
        let httpMethod: HttpMethod;
        let url: string;
        let testToken: string;

        beforeEach(() => {
            httpMethod = new HttpGetServiceMock;
            url = 'testUrl';
            testToken = 'testToken';

            spyOn(authService, 'getToken').and.returnValue(testToken);
        });

        it('should, if authorized, make request with auth token and return observable', () => {
            const tokenHeader = 'Bearer ' + testToken;
            const expectedOptions: HttpOptions = {
                headers: {
                    Authorization: tokenHeader
                }
            };

            spyOn(authService, 'isAuthorized').and.returnValue(true);
            spyOn(httpMethod, 'request').and.callThrough();

            const result = service.handle(httpMethod, url);

            expect(httpMethod.request).toHaveBeenCalledWith(url, expectedOptions);
            expect(result instanceof Observable).toBeTruthy();
        });

        it('should, if not authorized, create new queue request, add it to queue, authorize and return observable', () => {
            const testAuthQueueRequest = {
                source: new Subject,
                options: {},
                httpMethod,
                url
            };

            spyOn(authService, 'isAuthorized').and.returnValue(false);
            spyOn(authQueueService, 'createRequest').and.callThrough();
            spyOn(authQueueService, 'addRequest').and.callThrough();
            spyOn(authService, 'authorize').and.callThrough();

            const result = service.handle(httpMethod, url);

            expect(authQueueService.createRequest).toHaveBeenCalledWith(httpMethod, url, {});
            expect(authQueueService.addRequest).toHaveBeenCalledWith(testAuthQueueRequest);
            expect(authService.authorize).toHaveBeenCalled();
            expect(result instanceof Observable).toBeTruthy();
        });

        it('should, if not authorized, call authorize only one time for N number of requests', () => {
            spyOn(authService, 'isAuthorized').and.returnValue(false);
            spyOn(authService, 'authorize').and.callThrough();

            service.handle(httpMethod, url);
            service.handle(httpMethod, url);

            expect(authService.authorize).toHaveBeenCalledTimes(1);
        });

        it('should, if not authorized, when authorization was not successful throw error', fakeAsync(() => {
            const expectedErrorMessage = 'Authorization failed!';
            const authCredential = {
                success: false,
                expiresIn: new Date,
                accessToken: ''
            };

            spyOn(authService, 'isAuthorized').and.returnValue(false);
            spyOn(authService, 'authorize').and.returnValue(of(authCredential));

            try {
                service.handle(httpMethod, url);
                tick();
            } catch (error) {
                expect(error.message).toBe(expectedErrorMessage);
            }
        }));

        it('should, if not authorized, when authorization was successful save credential and release requests in queue', fakeAsync(() => {
            let request: AuthQueueRequest;
            const requestResult = {
                test: 'testData'
            };
            const authCredential = {
                success: true,
                expiresIn: new Date,
                accessToken: ''
            };

            spyOn(authService, 'isAuthorized').and.returnValue(false);
            spyOn(authService, 'authorize').and.returnValue(of(authCredential));
            spyOn(authQueueService, 'releaseRequests').and.callFake(() => [request]);
            spyOn(httpMethod, 'request').and.returnValue(of(requestResult));
            spyOn(authQueueService, 'addRequest').and.callFake((req: AuthQueueRequest) => {
                spyOn(req.source, 'next');
                spyOn(req.source, 'complete');
                request = req;
            });

            service.handle(httpMethod, url);
            tick();

            expect(authQueueService.releaseRequests).toHaveBeenCalled();
            expect(request.source.next).toHaveBeenCalled();
            expect(request.source.complete).toHaveBeenCalled();
        }));
    });
});
