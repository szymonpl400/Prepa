import { Component, Input } from '@angular/core';
import { Track, Album } from '../../../shared/shared.module';

@Component({
  selector: 'prp-player-description',
  templateUrl: './player-description.component.html',
  styleUrls: ['./player-description.component.scss']
})
export class PlayerDescriptionComponent {
    @Input()
    track: Track;

    @Input()
    album: Album;
}
