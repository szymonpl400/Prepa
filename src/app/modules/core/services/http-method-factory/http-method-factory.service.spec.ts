import { TestBed, getTestBed } from '@angular/core/testing';

import { HttpMethodFactoryService } from './http-method-factory.service';
import { HttpGetService } from '../http-get/http-get.service';
import { HttpGetServiceMock } from '../../mocks/http-get.service.mock';
import { HttpPostService } from '../http-post/http-post.service';
import { HttpPostServiceMock } from '../../mocks/http-post.service.mock';
import { HttpPutService } from '../http-put/http-put.service';
import { HttpPutServiceMock } from '../../mocks/http-put.service.mock';
import { HttpDeleteService } from '../http-delete/http-delete.service';
import { HttpDeleteServiceMock } from '../../mocks/http-delete.service.mock';
import { HttpMethodType } from '../../enums/http-method-type';

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
