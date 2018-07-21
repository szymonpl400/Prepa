import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AuthQueueService } from './auth-queue.service';
import { Observable, Subject } from 'rxjs';

describe('AuthQueueService', () => {
    let injector: TestBed;
    let service: AuthQueueService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AuthQueueService]
        });

        injector = getTestBed();
        service = injector.get(AuthQueueService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should add request and return requests', () => {
        const expected = {
            source: new Subject,
            apiRequest: () => new Observable
        };

        service.addRequest(expected);

        expect(service.releaseRequests()).toEqual([expected]);
    });

    describe('#releaseRequests', () => {
        it('should delete all requests', () => {
            const expected = {
                source: new Subject,
                apiRequest: () => new Observable
            };

            service.addRequest(expected);
            service.releaseRequests();

            expect(service.releaseRequests()).toEqual([]);
        });
    });
});
