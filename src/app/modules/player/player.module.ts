import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { PlayerComponent } from './components/player/player.component';
import { PlayerControlsComponent } from './components/player-controls/player-controls.component';
import { PlayerTimelineComponent } from './components/player-timeline/player-timeline.component';
import { PlayerDescriptionComponent } from './components/player-description/player-description.component';
import { PlayerTimerComponent } from './components/player-timer/player-timer.component';
import { PlayerSpeakerComponent } from './components/player-speaker/player-speaker.component';
import { PlayerService } from './services/player/player.service';

@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [
        PlayerComponent,
        PlayerControlsComponent,
        PlayerTimelineComponent,
        PlayerDescriptionComponent,
        PlayerTimerComponent,
        PlayerSpeakerComponent
    ],
    providers: [
        PlayerService
    ],
    exports: [
        PlayerComponent
    ]
})
export class PlayerModule { }

export { PlayerService } from './services/player/player.service';
