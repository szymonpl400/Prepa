import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { AlbumsComponent } from './components/albums/albums.component';
import { AlbumsListComponent } from './components/albums-list/albums-list.component';
import { AlbumItemComponent } from './components/album-item/album-item.component';


@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [
        AlbumsComponent,
        AlbumsListComponent,
        AlbumItemComponent
    ]
})
export class AlbumsModule { }
