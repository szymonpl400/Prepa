import { Component } from '@angular/core';

import { PlayerService } from '../../services/player/player.service';

@Component({
  selector: 'prp-player-controls',
  templateUrl: './player-controls.component.html',
  styleUrls: ['./player-controls.component.scss']
})
export class PlayerControlsComponent {

    constructor(public playerService: PlayerService) {
    }

    onTogglePlay() {
        this.playerService.togglePlay(!this.playerService.playControl.active);
    }

    onNextTrack() {
        if (!this.playerService.nextTrackControl.disabled) {
            this.playerService.nextTrack();
        }
    }

    onPreviousTrack() {
        if (!this.playerService.previousTrackControl.disabled) {
            this.playerService.previousTrack();
        }
    }
}
