import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavigationManagerService } from './services/navigation-manager/navigation-manager.service';
import { DateHelperService } from './services/date-helper/date-helper.service';
import { TypeHelperService } from './services/type-helper/type-helper.service';

import { ArtistsNameBySeparatorPipe } from './pipes/artists-name-by-separator/artists-name-by-separator.pipe';
import { MaterialModule } from '../material/material.module';
import { MsToTimePipe } from './pipes/ms-to-time/ms-to-time.pipe';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule
    ],
    declarations: [
        ArtistsNameBySeparatorPipe,
        MsToTimePipe
    ],
    providers: [
        NavigationManagerService,
        DateHelperService,
        TypeHelperService
    ],
    exports: [
        CommonModule,
        MaterialModule,
        ArtistsNameBySeparatorPipe,
        MsToTimePipe
    ]
})
export class SharedModule { }

export { Paging } from './api-models/paging';
export { Image } from './api-models/image';
export { Album } from './api-models/album';
export { Artist } from './api-models/artist';
export { Track } from './api-models/track';

export { NavigationManagerService } from './services/navigation-manager/navigation-manager.service';
export { DateHelperService } from './services/date-helper/date-helper.service';
export { TypeHelperService } from './services/type-helper/type-helper.service';
