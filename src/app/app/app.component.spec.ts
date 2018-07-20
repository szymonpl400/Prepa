import { TestBed, async, getTestBed, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AppComponent } from './app.component';
import { AuthService } from '../core/services/auth/auth.service';
import { AuthServiceMock } from '../core/services/auth/auth.service.mock';

describe('AppComponent', () => {
  let injector: TestBed;
  let authService: AuthService;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        {
          provide: AuthService,
          useClass: AuthServiceMock
        }
      ]
    }).compileComponents();

    injector = getTestBed();
    authService = injector.get(AuthService);
    fixture = TestBed.createComponent(AppComponent);
  }));

  it('should create the app', async(() => {
    expect(fixture.debugElement.componentInstance).toBeTruthy();
  }));

  it('should call authorize on AuthService when is not authorized', () => {
    spyOn(authService, 'isAuthorized').and.returnValue(false);
    spyOn(authService, 'authorize').and.returnValue({ subscribe() {} });

    fixture.debugElement.componentInstance.ngOnInit();

    expect(authService.authorize).toHaveBeenCalled();
  });

  it('should call save credential if response was successful', () => {
    const data = { success: true };
    spyOn(authService, 'isAuthorized').and.returnValue(false);
    spyOn(authService, 'authorize').and.returnValue({
      subscribe(cb) {
        cb(data);
      }
    });
    spyOn(authService, 'saveCredential');

    fixture.debugElement.componentInstance.ngOnInit();

    expect(authService.saveCredential).toHaveBeenCalledWith(data);
  });

  it('should throw error when authorization failed', () => {
    const data = { success: false };
    let fnWithError;
    spyOn(authService, 'isAuthorized').and.returnValue(false);
    spyOn(authService, 'authorize').and.returnValue({
      subscribe(cb) {
        fnWithError = function () {
          cb(data);
        };
      }
    });

    fixture.debugElement.componentInstance.ngOnInit();

    expect(fnWithError).toThrow(new Error('Authorization failed!'));
  });
});
