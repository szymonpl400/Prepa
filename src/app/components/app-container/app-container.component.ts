import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';

import { NavigationManagerService } from '../../services/navigation-manager.service';

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
