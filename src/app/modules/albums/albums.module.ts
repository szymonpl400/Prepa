import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlbumsComponent } from './components/albums/albums.component';
import { AlbumsRepositoryService } from './services/albums-repository/albums-repository.service';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        AlbumsComponent
    ],
    providers: [
        AlbumsRepositoryService
    ]
})
export class AlbumsModule { }
