import { Component, Input } from '@angular/core';

import { Album } from '../../interfaces/album';

@Component({
  selector: 'prp-albums-list',
  templateUrl: './albums-list.component.html',
  styleUrls: ['./albums-list.component.scss']
})
export class AlbumsListComponent {
    @Input()
    albums: Album[];

    trackByAlbum(index: number, album: Album): string {
        return album.id;
    }
}
