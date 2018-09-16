import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';

import { AlbumsComponent } from './components/albums/albums.component';
import { AlbumsListComponent } from './components/albums-list/albums-list.component';
import { AlbumItemComponent } from './components/album-item/album-item.component';

import { AlbumsRepositoryService } from './services/albums-repository/albums-repository.service';
import { ArtistsNameBySeparatorPipe } from './pipes/artists-name-by-separator.pipe';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule
    ],
    declarations: [
        AlbumsComponent,
        AlbumsListComponent,
        AlbumItemComponent,
        ArtistsNameBySeparatorPipe
    ],
    providers: [
        AlbumsRepositoryService
    ]
})
export class AlbumsModule { }
