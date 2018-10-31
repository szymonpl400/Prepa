import { Component, Input } from '@angular/core';

import { Track } from '../../../shared/shared.module';
import { PlayerService } from '../../../player/player.module';

@Component({
  selector: 'prp-tracks-list',
  templateUrl: './tracks-list.component.html',
  styleUrls: ['./tracks-list.component.scss']
})
export class TracksListComponent {
    displayedColumns = ['position', 'title', 'artist', 'time'];

    @Input()
    tracks: Track[];

    @Input()
    activeTrack: Track;

    @Input()
    isPlaying: boolean;

    constructor(private playerService: PlayerService) {
    }

    onTrackChanged(track: Track): void {
        this.playerService.activeTrack.next(this.activeTrack && this.activeTrack.id === track.id ? null : track);
    }

    onPlay(track: Track, event: Event): void {
        if (this.activeTrack && track.id === this.activeTrack.id) {
            this.playerService.togglePlay.next(!this.isPlaying);
        } else {
            this.onTrackChanged(track);
            this.playerService.togglePlay.next(true);
        }
        event.stopPropagation();
    }
}
