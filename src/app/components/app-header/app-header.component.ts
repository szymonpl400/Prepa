import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';

import { NavigationManagerService } from '../../services/navigation-manager.service';

@Component({
  selector: 'prp-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent {

    constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private navigationManager: NavigationManagerService) {
        iconRegistry.addSvgIcon('library-music', sanitizer.bypassSecurityTrustResourceUrl('assets/library-music.svg'));
    }

    toggleMenu() {
        this.navigationManager.toggle.emit();
    }
}
