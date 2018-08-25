import { TestBed, getTestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';

import { HttpGetService } from '../http-get/http-get.service';
import { AuthQueueService } from './auth-queue.service';
import { AuthQueueRequest } from '../../interfaces/auth-queue-request';

describe('AuthQueueService', () => {
    let injector: TestBed;
    let service: AuthQueueService;
    let queueRequest: AuthQueueRequest;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AuthQueueService,
                {
                    provide: HttpGetService,
                    useFactory: () => (
                        jasmine.createSpyObj('HttpGetService', ['request'])
                    )
                }
            ]
        });

        injector = getTestBed();
        service = injector.get(AuthQueueService);
        const httpMethod = injector.get(HttpGetService);

        queueRequest = {
            source: new Subject,
            url: 'test',
            options: {},
            httpMethod
        };
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('add request', () => {
        it('should add request', () => {
            service.addRequest(queueRequest);
            expect(service.releaseRequests()).toEqual([queueRequest]);
        });
    });

    describe('releaseRequests', () => {
        it('should delete all requests', () => {
            service.addRequest(queueRequest);
            service.releaseRequests();
            expect(service.releaseRequests()).toEqual([]);
        });
    });

    describe('createRequest', () => {
        it('should create new request', () => {
            const result = service.createRequest(queueRequest.httpMethod, queueRequest.url, queueRequest.options);
            expect(result).toEqual(queueRequest);
        });
    });
});
