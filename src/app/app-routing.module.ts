import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AlbumsComponent } from './modules/albums/components/albums/albums.component';
import { TracksComponent } from './modules/tracks/components/tracks/tracks.component';

const routes: Routes = [
    { path: '', redirectTo: '/albums', pathMatch: 'full' },
    { path: 'albums/:id/tracks', component: TracksComponent },
    { path: 'albums', component: AlbumsComponent },
    { path: '**', redirectTo: '/albums' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
