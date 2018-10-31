import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Album } from '../../../shared/api-models/album';

@Component({
  selector: 'prp-albums-list',
  templateUrl: './albums-list.component.html',
  styleUrls: ['./albums-list.component.scss']
})
export class AlbumsListComponent {

    @Input()
    albums: Album[];

    constructor(private router: Router) {
    }

    trackByAlbum(index: number, album: Album): string {
        return album.id;
    }

    goToTracks(albumId: string): void {
        this.router.navigate(['albums', albumId, 'tracks']);
    }
}
