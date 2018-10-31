import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowseRepositoryService } from './services/browse-repository/browse-repository.service';
import { AlbumsRepositoryService } from './services/albums-repository/albums-repository.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    BrowseRepositoryService,
    AlbumsRepositoryService
  ],
  declarations: []
})
export class RepositoryModule { }

export { BrowseRepositoryService } from './services/browse-repository/browse-repository.service';
export { AlbumsRepositoryService } from './services/albums-repository/albums-repository.service';
