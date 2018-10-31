import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerTimelineComponent } from './player-timeline.component';

describe('PlayerTimelineComponent', () => {
  let component: PlayerTimelineComponent;
  let fixture: ComponentFixture<PlayerTimelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerTimelineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
