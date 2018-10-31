import { TestBed, inject, getTestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';

import { BrowseRepositoryService } from './browse-repository.service';
import { Paging, Album } from '../../../shared/shared.module';
import { AlbumsMockData } from '../../../albums/mocks/albums-mock-data';
import { ApiService } from '../../../core/core.module';

describe('BrowseRepositoryService', () => {
    let service: BrowseRepositoryService;
    let apiService: jasmine.SpyObj<ApiService>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                BrowseRepositoryService,
                {
                    provide: ApiService,
                    useFactory: () => (
                        jasmine.createSpyObj('ApiService', ['get'])
                    )
                }
            ]
        });

        const injector = getTestBed();
        service = injector.get(BrowseRepositoryService);
        apiService = injector.get(ApiService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('getNewReleases', () => {
        it('should call correct api', () => {
            service.getNewReleases();
            expect(apiService.get).toHaveBeenCalledWith('browse/new-releases');
        });

        it('should return items from api request', () => {
            const stream = new Subject;
            const expectedResponse = { albums: AlbumsMockData.getAlbumsWithPaging() };
            apiService.get.and.returnValue(stream);
            service.getNewReleases().subscribe((response: { albums: Paging<Album> }) => {
                expect(response).toEqual(expectedResponse);
            });
            stream.next(expectedResponse);
        });
    });
});
