import { Component, OnInit } from '@angular/core';

import { BrowseRepositoryService } from '../../../repository/repository.module';
import { Paging, Album } from '../../../shared/shared.module';

@Component({
  selector: 'prp-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit {
    albums: Album[] = [];

    get areAlbumsEmpty() {
        return this.albums.length === 0;
    }

    constructor(private browseRepository: BrowseRepositoryService) { }

    ngOnInit() {
        this.browseRepository.getNewReleases().subscribe((response: { albums: Paging<Album> }) => {
            this.albums = response.albums.items;
        });
    }
}
