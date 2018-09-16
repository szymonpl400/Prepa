import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

import { AlbumsComponent } from './albums.component';
import { AlbumsRepositoryService } from '../../services/albums-repository/albums-repository.service';
import { AlbumsMockData } from '../../mocks/albums-mock-data';

describe('AlbumsComponent', () => {
    let component: AlbumsComponent;
    let fixture: ComponentFixture<AlbumsComponent>;
    let albumsRepositoryService: jasmine.SpyObj<AlbumsRepositoryService>;
    let ngOnInit: () => void;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ AlbumsComponent ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [
                {
                    provide: AlbumsRepositoryService,
                    useFactory: () => (
                        jasmine.createSpyObj('AlbumsRepositoryService', ['getNewReleases'])
                    )
                }
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AlbumsComponent);
        component = fixture.componentInstance;

        const injector = getTestBed();
        albumsRepositoryService = injector.get(AlbumsRepositoryService);

        ngOnInit = component.ngOnInit.bind(component);
        spyOn(component, 'ngOnInit');

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('ngOnInit', () => {
        beforeEach(() => {
            albumsRepositoryService.getNewReleases.and.returnValue(of({ albums: AlbumsMockData.getAlbumsWithPaging() }));
        });

        it('should call getNewReleases', () => {
            ngOnInit();
            expect(albumsRepositoryService.getNewReleases).toHaveBeenCalled();
        });

        it('should assign response albums to albums array', () => {
            ngOnInit();
            expect(component.albums).toEqual(AlbumsMockData.getAlbums());
        });
    });
});
