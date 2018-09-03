import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavigationManagerService } from './services/navigation-manager/navigation-manager.service';
import { DateHelperService } from './services/date-helper/date-helper.service';
import { TypeHelperService } from './services/type-helper/type-helper.service';

@NgModule({
    imports: [
        CommonModule
    ],
    providers: [
        NavigationManagerService,
        DateHelperService,
        TypeHelperService
    ]
})
export class SharedModule { }

export { Paging } from './interfaces/paging';
export { Image } from './interfaces/image';

export { NavigationManagerService } from './services/navigation-manager/navigation-manager.service';
export { DateHelperService } from './services/date-helper/date-helper.service';
export { TypeHelperService } from './services/type-helper/type-helper.service';
