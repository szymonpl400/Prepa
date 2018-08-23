import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { AlbumsMockData } from '../../mocks/albums-mock-data';
import { Paging } from '../../../shared/shared.module';
import { Album } from '../../interfaces/album';

@Injectable()
export class AlbumsRepositoryServiceMock {
    private albumsMockData = new AlbumsMockData;

    getNewReleases(): Observable<{ albums: Paging<Album> }> {
        return of({ albums: this.albumsMockData.getAlbumsWithPaging() });
    }
}
