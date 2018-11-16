import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Repository } from '../repository/repository.base';
import { AlbumFull } from '../../../shared/shared.module';

@Injectable()
export class AlbumsRepositoryService extends Repository {
    getAlbum(id: string): Observable<AlbumFull> {
        return this.apiService.get(`albums/${id}`);
    }
}
