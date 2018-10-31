import { Component, Input } from '@angular/core';
import { Track } from '../../../shared/shared.module';

@Component({
  selector: 'prp-player-description',
  templateUrl: './player-description.component.html',
  styleUrls: ['./player-description.component.scss']
})
export class PlayerDescriptionComponent {

    @Input()
    track: Track;
}
