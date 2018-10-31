import { Component } from '@angular/core';

import { NavigationManagerService } from '../../modules/shared/shared.module';

@Component({
  selector: 'prp-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent {

    constructor(private navigationManager: NavigationManagerService) {
    }

    toggleMenu() {
        this.navigationManager.toggle.emit();
    }
}
