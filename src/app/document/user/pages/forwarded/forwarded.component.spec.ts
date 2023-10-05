import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForwardedComponent } from './forwarded.component';

describe('ForwardedComponent', () => {
  let component: ForwardedComponent;
  let fixture: ComponentFixture<ForwardedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForwardedComponent]
    });
    fixture = TestBed.createComponent(ForwardedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
