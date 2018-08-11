import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

import { AppHeaderComponent } from './app-header.component';
import { NavigationManagerService } from '../../services/navigation-manager.service';
import { NavigationManagerServiceMock } from '../../services/navigation-manager.service.mock';

describe('AppHeaderComponent', () => {
  let component: AppHeaderComponent;
  let fixture: ComponentFixture<AppHeaderComponent>;
  let navigationManagerService: NavigationManagerService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppHeaderComponent
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
        fixture = TestBed.createComponent(AppHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        const injector = getTestBed();
        navigationManagerService = injector.get(NavigationManagerService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should click menu button call toggleMenu', () => {
        spyOn(component, 'toggleMenu');
        const buttonDebugElement = fixture.debugElement.query(By.css('#app-header-toggle-menu'));
        buttonDebugElement.nativeElement.click();
        expect(component.toggleMenu).toHaveBeenCalled();
    });

    describe('toggleMenu', () => {
        it('should emit toggle event', () => {
            spyOn(navigationManagerService.toggle, 'emit');
            component.toggleMenu();
            expect(navigationManagerService.toggle.emit).toHaveBeenCalled();
        });
    });
});
