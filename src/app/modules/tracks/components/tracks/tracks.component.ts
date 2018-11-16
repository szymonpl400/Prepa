import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AlbumsRepositoryService } from '../../../repository/repository.module';
import { PlayerService } from '../../../player/player.module';

@Component({
  selector: 'prp-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.scss']
})
export class TracksComponent implements OnInit {
    constructor(private activatedRoute: ActivatedRoute,
                private albumsRepository: AlbumsRepositoryService,
                public playerService: PlayerService) {
    }

    ngOnInit() {
        const albumId = this.activatedRoute.snapshot.params['id'];
        this.albumsRepository.getAlbum(albumId).subscribe(album => this.playerService.changeAlbum(album));
    }
}
