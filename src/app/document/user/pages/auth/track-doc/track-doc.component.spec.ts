import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackDocComponent } from './track-doc.component';

describe('TrackDocComponent', () => {
  let component: TrackDocComponent;
  let fixture: ComponentFixture<TrackDocComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrackDocComponent]
    });
    fixture = TestBed.createComponent(TrackDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
