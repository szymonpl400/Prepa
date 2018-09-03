import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';

import { AlbumsComponent } from './components/albums/albums.component';
import { AlbumsListComponent } from './components/albums-list/albums-list.component';
import { AlbumItemComponent } from './components/album-item/album-item.component';

import { AlbumsRepositoryService } from './services/albums-repository/albums-repository.service';
import { ColumnsNumberMapperService } from './services/responsiveness/columns-number-mapper/columns-number-mapper.service';
import { ImageWidthMapperService } from './services/responsiveness/image-width-mapper/image-width-mapper.service';
import { RowHeightMapperService } from './services/responsiveness/row-height-mapper/row-height-mapper.service';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule
    ],
    declarations: [
        AlbumsComponent,
        AlbumsListComponent,
        AlbumItemComponent
    ],
    providers: [
        AlbumsRepositoryService,
        ColumnsNumberMapperService,
        ImageWidthMapperService,
        RowHeightMapperService
    ]
})
export class AlbumsModule { }
