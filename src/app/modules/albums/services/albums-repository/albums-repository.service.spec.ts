import { TestBed, getTestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';

import { AlbumsRepositoryService } from './albums-repository.service';
import { ApiService, ApiServiceMock } from '../../../core/core.module';
import { AlbumsMockData } from '../../mocks/albums-mock-data';
import { Paging } from '../../../shared/shared.module';
import { Album } from '../../interfaces/album';

describe('AlbumsRepositoryService', () => {
    let service: AlbumsRepositoryService;
    let apiService: ApiServiceMock;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AlbumsRepositoryService,
                {
                    provide: ApiService,
                    useClass: ApiServiceMock
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
            spyOn(apiService, 'get');
            service.getNewReleases();
            expect(apiService.get).toHaveBeenCalledWith('browse/new-releases');
        });

        it('should return items from api request', () => {
            const albumsMockData = new AlbumsMockData;
            const stream = new Subject;
            const expectedResponse = { albums: albumsMockData.getAlbumsWithPaging() };
            spyOn(apiService, 'get').and.returnValue(stream);
            service.getNewReleases().subscribe((response: { albums: Paging<Album> }) => {
                expect(response).toEqual(expectedResponse);
            });
            stream.next(expectedResponse);
        });
    });
});
