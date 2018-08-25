import { TestBed, getTestBed } from '@angular/core/testing';

import { HttpMethodFactoryService } from './http-method-factory.service';
import { HttpGetService } from '../http-get/http-get.service';
import { HttpPostService } from '../http-post/http-post.service';
import { HttpPutService } from '../http-put/http-put.service';
import { HttpDeleteService } from '../http-delete/http-delete.service';
import { HttpMethodType } from '../../enums/http-method-type';

class HttpGetServiceMock {}
class HttpPostServiceMock {}
class HttpPutServiceMock {}
class HttpDeleteServiceMock {}

describe('HttpMethodFactoryService', () => {
    let injector: TestBed;
    let service: HttpMethodFactoryService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                HttpMethodFactoryService,
                {
                    provide: HttpGetService,
                    useClass: HttpGetServiceMock
                },
                {
                    provide: HttpPostService,
                    useClass: HttpPostServiceMock
                },
                {
                    provide: HttpPutService,
                    useClass: HttpPutServiceMock
                },
                {
                    provide: HttpDeleteService,
                    useClass: HttpDeleteServiceMock
                }
            ]
        });

        injector = getTestBed();
        service = injector.get(HttpMethodFactoryService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('create', () => {
        it('should return http get method service', () => {
            const method = service.create(HttpMethodType.Get);
            expect(method instanceof HttpGetServiceMock).toBeTruthy();
        });

        it('should return http post method service', () => {
            const method = service.create(HttpMethodType.Post);
            expect(method instanceof HttpPostServiceMock).toBeTruthy();
        });

        it('should return http put method service', () => {
            const method = service.create(HttpMethodType.Put);
            expect(method instanceof HttpPutServiceMock).toBeTruthy();
        });

        it('should return http delete method service', () => {
            const method = service.create(HttpMethodType.Delete);
            expect(method instanceof HttpDeleteServiceMock).toBeTruthy();
        });
    });
});
