import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpGetServiceMock } from '../../mocks/http-get.service.mock';

import { AuthQueueService } from './auth-queue.service';
import { Subject } from 'rxjs';
import { AuthQueueRequest } from '../../interfaces/auth-queue-request';

describe('AuthQueueService', () => {
    let injector: TestBed;
    let service: AuthQueueService;
    let testRequest: AuthQueueRequest;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AuthQueueService]
        });

        injector = getTestBed();
        service = injector.get(AuthQueueService);
        testRequest = {
            source: new Subject,
            url: 'test',
            options: {},
            httpMethod: new HttpGetServiceMock
        };
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('add request', () => {
        it('should add request', () => {
            service.addRequest(testRequest);
            expect(service.releaseRequests()).toEqual([testRequest]);
        });
    });

    describe('releaseRequests', () => {
        it('should delete all requests', () => {
            service.addRequest(testRequest);
            service.releaseRequests();
            expect(service.releaseRequests()).toEqual([]);
        });
    });

    describe('createRequest', () => {
        it('should create new request', () => {
            const result = service.createRequest(testRequest.httpMethod, testRequest.url, testRequest.options);
            expect(result).toEqual(testRequest);
        });
    });
});
