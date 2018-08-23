import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../../../core/core.module';
import { Album } from '../../interfaces/album';
import { Paging } from '../../../shared/shared.module';

@Injectable()
export class AlbumsRepositoryService {

    constructor(private apiService: ApiService) { }

    getNewReleases(): Observable<{ albums: Paging<Album> }> {
        return this.apiService.get('browse/new-releases');
    }
}
