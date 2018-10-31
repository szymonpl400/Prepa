import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        SharedModule
    ],
    declarations: []
})
export class ArtistsModule { }

export { ArtistsMockData } from './mocks/artists-mock-data';
