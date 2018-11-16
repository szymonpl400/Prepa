import { Component, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { Subject, merge } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { PlayerService } from '../../services/player/player.service';
import { LoginService } from '../../../shared/shared.module';

@Component({
  selector: 'prp-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit, OnDestroy {
    time = 0;
    componentDestroyed = new Subject();

    get duration(): number {
        return this.loginService.isLogged() ? this.playerService.activeTrack.duration_ms : 30000;
    }

    @ViewChild('audio')
    audio: ElementRef<HTMLAudioElement>;

    constructor(public playerService: PlayerService, public loginService: LoginService) {
    }

    ngOnInit() {
        const { playControl, activeTrackChanged, onEachSecondWhilePlay } = this.playerService;
        merge(playControl.activeChanged, activeTrackChanged).pipe(takeUntil(this.componentDestroyed))
            .subscribe(() => this.onTogglePlay(this.playerService.playControl.active));
        onEachSecondWhilePlay.pipe(takeUntil(this.componentDestroyed)).subscribe(() => {
            this.time = this.audio.nativeElement.currentTime * 1000;
        });
        if (playControl.active) {
            this.audio.nativeElement.play();
        }
    }

    ngOnDestroy() {
        this.componentDestroyed.next();
        this.componentDestroyed.complete();
    }

    onAudioEnded() {
        this.playerService.togglePlay(false);
        this.time = this.duration;
    }

    onTogglePlay(isPlaying: boolean) {
        if (isPlaying) {
            if (this.audio.nativeElement.src !== this.playerService.activeTrack.preview_url) {
                this.audio.nativeElement.src = this.playerService.activeTrack.preview_url;
            }
            this.audio.nativeElement.play();
            this.time = this.audio.nativeElement.currentTime;
        } else {
            this.audio.nativeElement.pause();
        }
    }

    onVolumeChanged(value: number) {
        this.audio.nativeElement.volume = value;
    }

    onTimelineClick(value: number) {
        this.audio.nativeElement.currentTime = (this.duration / 1000) * value;
        this.time = this.duration * value;
    }
}
