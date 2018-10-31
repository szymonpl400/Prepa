import { Component, Input } from '@angular/core';

@Component({
  selector: 'prp-player-timer',
  templateUrl: './player-timer.component.html',
  styleUrls: ['./player-timer.component.scss']
})
export class PlayerTimerComponent {

    @Input()
    duration: number;

    @Input()
    time: number;
}
