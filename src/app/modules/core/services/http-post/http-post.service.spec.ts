import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { HttpPostService } from './http-post.service';

describe('HttpPostService', () => {
    let injector: TestBed;
    let service: HttpPostService;
    let httpClient;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                HttpPostService,
                {
                    provide: HttpClient,
                    useFactory: () => {
                        return jasmine.createSpyObj('HttpClient', ['post']);
                    }
                }
            ]
        });

        injector = getTestBed();
        service = injector.get(HttpPostService);
        httpClient = injector.get(HttpClient);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('request', () => {
        it('should use post method', () => {
            const url = 'testUrl';
            service.request(url);
            expect(httpClient.post).toHaveBeenCalledWith(url, undefined);
        });
    });
});
