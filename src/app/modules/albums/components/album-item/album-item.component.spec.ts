import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AlbumItemComponent } from './album-item.component';
import { ArtistsNameBySeparatorPipe } from '../../pipes/artists-name-by-separator.pipe';
import { AlbumsMockData } from '../../mocks/albums-mock-data';


describe('AlbumItemComponent', () => {
  let component: AlbumItemComponent;
  let fixture: ComponentFixture<AlbumItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
          AlbumItemComponent,
          ArtistsNameBySeparatorPipe
        ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumItemComponent);
    component = fixture.componentInstance;

    component.album = AlbumsMockData.getAlbum();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
