import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonRecordsComponent } from './person-records.component';

describe('PersonRecordsComponent', () => {
  let component: PersonRecordsComponent;
  let fixture: ComponentFixture<PersonRecordsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonRecordsComponent]
    });
    fixture = TestBed.createComponent(PersonRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
