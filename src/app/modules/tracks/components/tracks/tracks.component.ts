import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AlbumsRepositoryService } from '../../../repository/repository.module';
import { Paging, Track } from '../../../shared/shared.module';
import { PlayerService } from '../../../player/player.module';

@Component({
  selector: 'prp-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.scss']
})
export class TracksComponent implements OnInit, OnDestroy {
    componentDestroyed = new Subject();
    isPlaying: Observable<boolean>;
    activeTrack: Observable<Track>;
    tracks: Track[] = [];

    constructor(private activatedRoute: ActivatedRoute,
                private albumsRepository: AlbumsRepositoryService,
                private playerService: PlayerService) {
    }

    ngOnInit() {
        const albumId = this.activatedRoute.snapshot.params['id'];
        this.albumsRepository.getAlbumsTracks(albumId).subscribe((response: Paging<Track>) => {
            this.tracks = response.items;
        });
        this.activeTrack = this.playerService.activeTrack.pipe(takeUntil(this.componentDestroyed));
        this.isPlaying = this.playerService.togglePlay.pipe(takeUntil(this.componentDestroyed));
    }

    ngOnDestroy() {
        this.componentDestroyed.next();
        this.componentDestroyed.complete();
    }
}
