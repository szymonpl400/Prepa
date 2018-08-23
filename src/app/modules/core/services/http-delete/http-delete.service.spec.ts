import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { HttpDeleteService } from './http-delete.service';

describe('HttpDeleteService', () => {
    let injector: TestBed;
    let service: HttpDeleteService;
    let httpClient;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                HttpDeleteService,
                {
                    provide: HttpClient,
                    useFactory: () => {
                        return jasmine.createSpyObj('HttpClient', ['delete']);
                    }
                }
            ]
        });

        injector = getTestBed();
        service = injector.get(HttpDeleteService);
        httpClient = injector.get(HttpClient);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('request', () => {
        it('should use delete method', () => {
            const url = 'testUrl';
            service.request(url);
            expect(httpClient.delete).toHaveBeenCalledWith(url, undefined);
        });
    });
});
