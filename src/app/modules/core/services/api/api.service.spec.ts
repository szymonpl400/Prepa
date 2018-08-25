import { TestBed, getTestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import { HttpMethodFactoryService } from '../http-method-factory/http-method-factory.service';
import { ApiAuthorizationService } from '../api-authorization/api-authorization.service';
import { HttpMethodType } from '../../enums/http-method-type';

describe('ApiService', () => {
    let testApiUrl: string;
    let injector: TestBed;
    let service: ApiService;
    let httpMethodFactory: jasmine.SpyObj<HttpMethodFactoryService>;
    let apiAuthorizationService: jasmine.SpyObj<ApiAuthorizationService>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ApiService,
                {
                    provide: HttpMethodFactoryService,
                    useFactory: () => (
                        jasmine.createSpyObj('HttpMethodFactoryService', ['create'])
                    )
                },
                {
                    provide: ApiAuthorizationService,
                    useFactory: () => (
                        jasmine.createSpyObj('ApiAuthorizationService', ['handle'])
                    )
                }
            ]
        });

        injector = getTestBed();
        service = injector.get(ApiService);
        httpMethodFactory = injector.get(HttpMethodFactoryService);
        apiAuthorizationService = injector.get(ApiAuthorizationService);
        testApiUrl = 'test';
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('should create http method', () => {
        it('get', () => {
            service.get(testApiUrl);
            expect(httpMethodFactory.create).toHaveBeenCalledWith(HttpMethodType.Get);
        });

        it('post', () => {
            service.post(testApiUrl);
            expect(httpMethodFactory.create).toHaveBeenCalledWith(HttpMethodType.Post);
        });

        it('put', () => {
            service.put(testApiUrl);
            expect(httpMethodFactory.create).toHaveBeenCalledWith(HttpMethodType.Put);
        });

        it('delete', () => {
            service.delete(testApiUrl);
            expect(httpMethodFactory.create).toHaveBeenCalledWith(HttpMethodType.Delete);
        });
    });

    describe('should call handle api authorization with base url', () => {
        let expectedUrl: string;
        let expectedMethod;

        beforeEach(() => {
            expectedUrl = service.API_BASE_URL + testApiUrl;
            expectedMethod = {};

            httpMethodFactory.create.and.returnValue(expectedMethod);
        });

        it('get', () => {
            service.get(testApiUrl);
            expect(apiAuthorizationService.handle).toHaveBeenCalledWith(expectedMethod, expectedUrl, {});
        });

        it('post', () => {
            service.post(testApiUrl);
            expect(apiAuthorizationService.handle).toHaveBeenCalledWith(expectedMethod, expectedUrl, {});
        });

        it('put', () => {
            service.put(testApiUrl);
            expect(apiAuthorizationService.handle).toHaveBeenCalledWith(expectedMethod, expectedUrl, {});
        });

        it('delete', () => {
            service.delete(testApiUrl);
            expect(apiAuthorizationService.handle).toHaveBeenCalledWith(expectedMethod, expectedUrl, {});
        });
    });
});
