import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';

import { AppContainerComponent } from './app-container.component';
import { NavigationManagerService, NavigationManagerServiceMock } from '../../modules/shared/shared.module';
import { MaterialModule } from '../../modules/material/material.module';

describe('AppContainerComponent', () => {
    let component: AppContainerComponent;
    let fixture: ComponentFixture<AppContainerComponent>;
    let navigationManagerService: NavigationManagerServiceMock;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                BrowserAnimationsModule
            ],
            declarations: [
                AppContainerComponent
            ],
            providers: [
                {
                    provide: NavigationManagerService,
                    useClass: NavigationManagerServiceMock
                }
            ],
            schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        const injector = getTestBed();
        navigationManagerService = injector.get(NavigationManagerService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should toggle sidenav when opened changed', () => {
        spyOn(component.sidenav, 'toggle');
        navigationManagerService.toggle.emit();
        expect(component.sidenav.toggle).toHaveBeenCalled();
    });
});
