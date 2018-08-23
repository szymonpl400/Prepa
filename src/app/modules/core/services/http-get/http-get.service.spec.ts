import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { HttpGetService } from './http-get.service';

describe('HttpGetService', () => {
    let injector: TestBed;
    let service: HttpGetService;
    let httpClient;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                HttpGetService,
                {
                    provide: HttpClient,
                    useFactory: () => {
                        return jasmine.createSpyObj('HttpClient', ['get']);
                    }
                }
            ]
        });

        injector = getTestBed();
        service = injector.get(HttpGetService);
        httpClient = injector.get(HttpClient);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('request', () => {
        it('should use get method', () => {
            const url = 'testUrl';
            service.request(url);
            expect(httpClient.get).toHaveBeenCalledWith(url, undefined);
        });
    });
});
