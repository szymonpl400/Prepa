import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Track, AlbumFull } from '../../../shared/shared.module';
import { Control } from '../../models/control';

@Injectable()
export class PlayerService {
    onEachSecondWhilePlayTimerId: number;
    playControl = new Control();
    nextTrackControl = new Control();
    previousTrackControl = new Control();
    activeAlbum: AlbumFull;
    activeTrack: Track;
    activeTrackChanged = new Subject<Track>();
    onEachSecondWhilePlay = new Subject();

    constructor() {
        this.playControl.activeChanged.subscribe(isActive => {
            if (isActive) {
                this.onEachSecondWhilePlayTimerId = window.setInterval(() => this.onEachSecondWhilePlay.next(), 100);
            } else {
                clearInterval(this.onEachSecondWhilePlayTimerId);
            }
        });
    }

    previousTrack() {
        const index = this.getTrackIndex(this.activeTrack);
        if (index >= 0) {
            const previousTrack = this.activeAlbum.tracks.items[index - 1];
            if (previousTrack) {
                this.changeTrack(previousTrack);
            }
        }
    }

    nextTrack() {
        const index = this.getTrackIndex(this.activeTrack);
        if (index >= 0) {
            const nextTrack = this.activeAlbum.tracks.items[index + 1];
            if (nextTrack) {
                this.changeTrack(nextTrack);
            }
        }
    }

    changeTrack(track: Track) {
        this.activeTrack = track;
        this.activeTrackChanged.next(track);
        const index = this.getTrackIndex(track);
        const items = this.activeAlbum.tracks.items;
        this.nextTrackControl.disabled = !items[index + 1];
        this.previousTrackControl.disabled = !items[index - 1];
    }

    deactivateTrack() {
        this.activeTrack = null;
        this.playControl.active = false;
    }

    togglePlay(value: boolean) {
        this.playControl.active = value;
    }

    changeAlbum(album: AlbumFull) {
        this.activeAlbum = album;
    }

    getTrackIndex(track: Track): number {
        return this.activeAlbum.tracks.items.findIndex(item => item.id === track.id);
    }
}
