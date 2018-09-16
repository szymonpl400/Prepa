import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AlbumsListComponent } from './albums-list.component';
import { AlbumsMockData } from '../../mocks/albums-mock-data';

describe('AlbumsListComponent', () => {
    let component: AlbumsListComponent;
    let fixture: ComponentFixture<AlbumsListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AlbumsListComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AlbumsListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('trackByAlbum', () => {
        it('should return album id', () => {
            const album = AlbumsMockData.getAlbum();
            const result = component.trackByAlbum(0, album);
            expect(result).toBe(album.id);
        });
    });
});
