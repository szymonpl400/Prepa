import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Paging, Album } from '../../../shared/shared.module';
import { Repository } from '../repository/repository.base';

@Injectable()
export class BrowseRepositoryService extends Repository {

    getNewReleases(): Observable<{ albums: Paging<Album> }> {
        return this.apiService.get('browse/new-releases');
    }
}
