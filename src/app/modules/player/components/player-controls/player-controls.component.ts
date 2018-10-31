import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { PlayerService } from '../../services/player/player.service';

@Component({
  selector: 'prp-player-controls',
  templateUrl: './player-controls.component.html',
  styleUrls: ['./player-controls.component.scss']
})
export class PlayerControlsComponent implements OnInit, OnDestroy {
    componentDestroyed = new Subject();
    isPlaying: boolean;

    constructor(private playerService: PlayerService) {
    }

    ngOnInit() {
        this.playerService.togglePlay.pipe(takeUntil(this.componentDestroyed))
            .subscribe(isPlaying => this.isPlaying = isPlaying);
    }

    ngOnDestroy() {
        this.componentDestroyed.next();
        this.componentDestroyed.complete();
    }

    onTogglePlay() {
        this.playerService.togglePlay.next(!this.isPlaying);
    }
}
