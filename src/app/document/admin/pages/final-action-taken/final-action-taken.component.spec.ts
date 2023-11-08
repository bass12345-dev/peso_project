import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalActionTakenComponent } from './final-action-taken.component';

describe('FinalActionTakenComponent', () => {
  let component: FinalActionTakenComponent;
  let fixture: ComponentFixture<FinalActionTakenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinalActionTakenComponent]
    });
    fixture = TestBed.createComponent(FinalActionTakenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
