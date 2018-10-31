import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { TracksComponent } from './components/tracks/tracks.component';
import { TracksListComponent } from './components/tracks-list/tracks-list.component';

@NgModule({
    imports: [
        SharedModule,
    ],
    declarations: [
        TracksComponent,
        TracksListComponent
    ]
})
export class TracksModule { }
