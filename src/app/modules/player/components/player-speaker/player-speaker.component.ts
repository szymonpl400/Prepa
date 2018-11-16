import { Component, Output, EventEmitter, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatSliderChange, MatSlider } from '@angular/material';

@Component({
  selector: 'prp-player-speaker',
  templateUrl: './player-speaker.component.html',
  styleUrls: ['./player-speaker.component.scss']
})
export class PlayerSpeakerComponent implements OnInit {
    private _volume: number;

    toggledVolume: number;
    volumeStep = 0.01;
    minVolume = 0;
    maxVolume = 1;

    get volume(): number {
        return this._volume;
    }
    set volume(value: number) {
        this._volume = value;
        this.volumeChanged.emit(value);
    }

    @Output()
    volumeChanged = new EventEmitter<number>();

    @ViewChild('slider')
    slider: MatSlider;

    ngOnInit() {
       this.volume = this.maxVolume / 2;
    }

    onSliderMove(change: MatSliderChange) {
        this.volume = change.value;
    }

    onToggleVolume() {
        if (this.volume > 0) {
            this.toggledVolume = this.volume;
            this.slider.value = 0;
            this.volume = 0;
        } else {
            this.slider.value = this.toggledVolume;
            this.volume = this.toggledVolume;
        }
    }
}
