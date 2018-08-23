import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { HttpPutService } from './http-put.service';

describe('HttpPutService', () => {
    let injector: TestBed;
    let service: HttpPutService;
    let httpClient;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                HttpPutService,
                {
                    provide: HttpClient,
                    useFactory: () => {
                        return jasmine.createSpyObj('HttpClient', ['put']);
                    }
                }
            ]
        });

        injector = getTestBed();
        service = injector.get(HttpPutService);
        httpClient = injector.get(HttpClient);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('request', () => {
        it('should use put method', () => {
            const url = 'testUrl';
            service.request(url);
            expect(httpClient.put).toHaveBeenCalledWith(url, undefined);
        });
    });
});
