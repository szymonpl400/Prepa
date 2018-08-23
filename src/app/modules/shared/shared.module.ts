import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavigationManagerService } from './services/navigation-manager/navigation-manager.service';
import { NavigationManagerServiceMock } from './services/navigation-manager/navigation-manager.service.mock';

@NgModule({
    imports: [
        CommonModule
    ],
    providers: [
        NavigationManagerService,
        NavigationManagerServiceMock
    ],
    declarations: []
})
export class SharedModule { }

export { Paging } from './interfaces/paging';
export { NavigationManagerService } from './services/navigation-manager/navigation-manager.service';
export { NavigationManagerServiceMock } from './services/navigation-manager/navigation-manager.service.mock';
