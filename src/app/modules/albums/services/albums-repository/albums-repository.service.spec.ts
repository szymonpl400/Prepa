import { TestBed, getTestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';

import { AlbumsRepositoryService } from './albums-repository.service';
import { ApiService } from '../../../core/core.module';
import { AlbumsMockData } from '../../mocks/albums-mock-data';
import { Paging } from '../../../shared/shared.module';
import { Album } from '../../interfaces/album';

describe('AlbumsRepositoryService', () => {
    let service: AlbumsRepositoryService;
    let apiService: jasmine.SpyObj<ApiService>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AlbumsRepositoryService,
                {
                    provide: ApiService,
                    useFactory: () => (
                        jasmine.createSpyObj('ApiService', ['get'])
                    )
                }
            ]
        });

        const injector = getTestBed();
        service = injector.get(AlbumsRepositoryService);
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
