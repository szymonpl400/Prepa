import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Repository } from '../repository/repository.base';
import { Paging, Track } from '../../../shared/shared.module';

@Injectable()
export class AlbumsRepositoryService extends Repository {

    getAlbumsTracks(albumId: string): Observable<Paging<Track>> {
        return this.apiService.get(`albums/${albumId}/tracks`);
    }
}
