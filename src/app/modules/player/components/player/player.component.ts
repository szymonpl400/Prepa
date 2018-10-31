import { Component, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Track } from '../../../shared/shared.module';
import { PlayerService } from '../../services/player/player.service';

@Component({
  selector: 'prp-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit, OnDestroy {
    time = 10000;
    componentDestroyed = new Subject();
    activeTrack: Track;

    @ViewChild('audio')
    audio: ElementRef<HTMLAudioElement>;

    constructor(private playerService: PlayerService) {
    }

    ngOnInit() {
        this.playerService.activeTrack.pipe(takeUntil(this.componentDestroyed)).subscribe(track => this.activeTrack = track);
        this.playerService.togglePlay.pipe(takeUntil(this.componentDestroyed)).subscribe(isPlaying => this.onTogglePlay(isPlaying));
    }

    ngOnDestroy() {
        this.componentDestroyed.next();
        this.componentDestroyed.complete();
    }

    onTogglePlay(isPlaying: boolean) {
        if (isPlaying) {
            if (this.audio.nativeElement.src !== this.activeTrack.preview_url) {
                this.audio.nativeElement.src = this.activeTrack.preview_url;
            }
            this.audio.nativeElement.play();
        } else {
            this.audio.nativeElement.pause();
        }
    }
}
