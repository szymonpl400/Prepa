import { Component, ViewChild, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material';

import { NavigationManagerService } from '../../modules/shared/shared.module';

@Component({
  selector: 'prp-app-container',
  templateUrl: './app-container.component.html',
  styleUrls: ['./app-container.component.scss']
})
export class AppContainerComponent implements OnInit {
    @ViewChild('sidenav')
    sidenav: MatSidenav;

    constructor(private navigationManager: NavigationManagerService) {
    }

    ngOnInit() {
        this.navigationManager.toggle.subscribe(() => {
            this.sidenav.toggle();
        });
    }
}
