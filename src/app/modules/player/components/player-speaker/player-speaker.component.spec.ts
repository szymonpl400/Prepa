import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerSpeakerComponent } from './player-speaker.component';

describe('PlayerSpeakerComponent', () => {
  let component: PlayerSpeakerComponent;
  let fixture: ComponentFixture<PlayerSpeakerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerSpeakerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerSpeakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
