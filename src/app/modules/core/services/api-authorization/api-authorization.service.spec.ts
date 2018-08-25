import { TestBed, getTestBed, fakeAsync, tick } from '@angular/core/testing';
import { Observable, Subject, of } from 'rxjs';

import { ApiAuthorizationService } from './api-authorization.service';
import { AuthService } from '../auth/auth.service';
import { HttpGetService } from '../http-get/http-get.service';
import { AuthQueueService } from '../auth-queue/auth-queue.service';
import { HttpOptions } from '../../interfaces/http-options';
import { AuthQueueRequest } from '../../interfaces/auth-queue-request';

describe('ApiAuthorizationService', () => {
    let injector: TestBed;
    let service: ApiAuthorizationService;
    let authService: jasmine.SpyObj<AuthService>;
    let authQueueService: jasmine.SpyObj<AuthQueueService>;
    let httpMethod: jasmine.SpyObj<HttpGetService>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ApiAuthorizationService,
                {
                    provide: HttpGetService,
                    useFactory: () => (
                        jasmine.createSpyObj('HttpGetService', ['request'])
                    )
                },
                {
                    provide: AuthService,
                    useFactory: () => (
                        jasmine.createSpyObj('AuthService', ['getToken', 'isAuthorized', 'authorize', 'saveCredentials'])
                    )
                },
                {
                    provide: AuthQueueService,
                    useFactory: () => (
                        jasmine.createSpyObj('AuthQueueService', ['createRequest', 'addRequest', 'releaseRequests'])
                    )
                }
            ]
        });

        injector = getTestBed();
        service = injector.get(ApiAuthorizationService);
        authService = injector.get(AuthService);
        authQueueService = injector.get(AuthQueueService);
        httpMethod = injector.get(HttpGetService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('handle', () => {
        let url: string;
        let testToken: string;
        let queueRequest: AuthQueueRequest;

        beforeEach(() => {
            url = 'testUrl';
            testToken = 'testToken';
            queueRequest = {
                source: new Subject,
                options: {},
                httpMethod,
                url
            };

            authService.getToken.and.returnValue(testToken);
        });

        it('should, if authorized, make request with auth token and return observable', () => {
            const tokenHeader = 'Bearer ' + testToken;
            const expectedOptions: HttpOptions = {
                headers: {
                    Authorization: tokenHeader
                }
            };

            authService.isAuthorized.and.returnValue(true);
            httpMethod.request.and.returnValue(new Observable);

            const result = service.handle(httpMethod, url);

            expect(httpMethod.request).toHaveBeenCalledWith(url, expectedOptions);
            expect(result instanceof Observable).toBeTruthy();
        });

        it('should, if not authorized, create new queue request, add it to queue, authorize and return observable', () => {
            authService.isAuthorized.and.returnValue(false);
            authQueueService.createRequest.and.returnValue(queueRequest);
            authService.authorize.and.returnValue(new Observable);

            const result = service.handle(httpMethod, url);

            expect(authQueueService.createRequest).toHaveBeenCalledWith(httpMethod, url, {});
            expect(authQueueService.addRequest).toHaveBeenCalledWith(queueRequest);
            expect(authService.authorize).toHaveBeenCalled();
            expect(result instanceof Observable).toBeTruthy();
        });

        it('should, if not authorized, call authorize only one time for N number of requests', () => {
            authQueueService.createRequest.and.returnValue(queueRequest);
            authService.isAuthorized.and.returnValue(false);
            authService.authorize.and.returnValue(new Observable);

            service.handle(httpMethod, url);
            service.handle(httpMethod, url);

            expect(authService.authorize).toHaveBeenCalledTimes(1);
        });

        it('should, if not authorized, when authorization was not successful throw error', fakeAsync(() => {
            const expectedErrorMessage = 'Authorization failed!';
            const authCredential = {
                success: false,
                expiresIn: Date.now(),
                accessToken: ''
            };

            authService.isAuthorized.and.returnValue(false);
            authService.authorize.and.returnValue(of(authCredential));
            authQueueService.createRequest.and.returnValue(queueRequest);

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
                expiresIn: Date.now(),
                accessToken: ''
            };

            authService.isAuthorized.and.returnValue(false);
            authService.authorize.and.returnValue(of(authCredential));
            httpMethod.request.and.returnValue(of(requestResult));
            authQueueService.releaseRequests.and.callFake(() => [request]);
            authQueueService.createRequest.and.returnValue(queueRequest);
            authQueueService.addRequest.and.callFake((req: AuthQueueRequest) => {
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
