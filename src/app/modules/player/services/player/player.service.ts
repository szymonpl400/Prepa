import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Track } from '../../../shared/shared.module';

@Injectable()
export class PlayerService {
    activeTrack = new ReplaySubject<Track>();
    togglePlay = new ReplaySubject<boolean>();
}
