import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NavigationManagerService, Track } from '../../modules/shared/shared.module';
import { PlayerService } from '../../modules/player/player.module';

@Component({
  selector: 'prp-app-container',
  templateUrl: './app-container.component.html',
  styleUrls: ['./app-container.component.scss']
})
export class AppContainerComponent implements OnInit, OnDestroy {
    componentDestroyed = new Subject();
    activeTrack: Observable<Track>;

    @ViewChild('sidenav')
    sidenav: MatSidenav;

    constructor(private navigationManager: NavigationManagerService,
                private playerService: PlayerService) {
    }

    ngOnInit() {
        this.navigationManager.toggle.subscribe(() => this.sidenav.toggle());
        this.activeTrack = this.playerService.activeTrack.pipe(takeUntil(this.componentDestroyed));
    }

    ngOnDestroy() {
        this.componentDestroyed.next();
        this.componentDestroyed.complete();
    }
}
