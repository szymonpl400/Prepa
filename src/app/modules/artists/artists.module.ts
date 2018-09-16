import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class ArtistsModule { }


export { Artist } from './interfaces/artist';
export { ArtistsMockData } from './mocks/artists-mock-data';
