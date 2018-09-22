import { Component, OnInit } from '@angular/core';

import { AlbumsRepositoryService } from '../../services/albums-repository/albums-repository.service';
import { Album } from '../../interfaces/album';
import { Paging } from '../../../shared/shared.module';

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

    constructor(private albumsRepository: AlbumsRepositoryService) { }

    ngOnInit() {
        this.albumsRepository.getNewReleases().subscribe((response: { albums: Paging<Album> }) => {
            this.albums = response.albums.items;
        });
    }
}
