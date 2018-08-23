import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';

import { AlbumsComponent } from './albums.component';
import { AlbumsRepositoryService } from '../../services/albums-repository/albums-repository.service';
import { AlbumsRepositoryServiceMock } from '../../services/albums-repository/albums-repository.service.mock';
import { AlbumsMockData } from '../../mocks/albums-mock-data';

describe('AlbumsComponent', () => {
    let component: AlbumsComponent;
    let fixture: ComponentFixture<AlbumsComponent>;
    let albumsRepositoryService: AlbumsRepositoryServiceMock;
    let ngOnInit: () => void;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ AlbumsComponent ],
            providers: [
                {
                    provide: AlbumsRepositoryService,
                    useClass: AlbumsRepositoryServiceMock
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
        it('should call getNewReleases', () => {
            spyOn(albumsRepositoryService, 'getNewReleases').and.callThrough();
            ngOnInit();
            expect(albumsRepositoryService.getNewReleases).toHaveBeenCalled();
        });

        it('should assign response albums to albums array', () => {
            const albumsMockData = new AlbumsMockData;
            ngOnInit();
            expect(component.albums).toEqual(albumsMockData.getAlbums());
        });
    });
});
