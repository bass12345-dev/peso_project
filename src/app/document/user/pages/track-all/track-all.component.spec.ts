import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackAllComponent } from './track-all.component';

describe('TrackAllComponent', () => {
  let component: TrackAllComponent;
  let fixture: ComponentFixture<TrackAllComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrackAllComponent]
    });
    fixture = TestBed.createComponent(TrackAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
