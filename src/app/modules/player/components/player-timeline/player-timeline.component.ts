import { Component, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'prp-player-timeline',
  templateUrl: './player-timeline.component.html',
  styleUrls: ['./player-timeline.component.scss']
})
export class PlayerTimelineComponent {
    @Input()
    progress: number;

    @Output()
    timelineClick = new EventEmitter<number>();

    @ViewChild('timeline')
    timeline: ElementRef<HTMLElement>;

    onTimelineClick(event) {
        const rect = event.target.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const width = this.timeline.nativeElement.offsetWidth;
        this.timelineClick.next(x / width);
    }
}
