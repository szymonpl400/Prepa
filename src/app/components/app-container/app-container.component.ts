import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';

import { NavigationManagerService } from '../../modules/shared/shared.module';

@Component({
  selector: 'prp-app-container',
  templateUrl: './app-container.component.html',
  styleUrls: ['./app-container.component.scss']
})
export class AppContainerComponent {

    @ViewChild('sidenav')
    sidenav: MatSidenav;

    constructor(navigationManager: NavigationManagerService) {
        navigationManager.toggle.subscribe(() => {
            this.sidenav.toggle();
        });
    }
}
