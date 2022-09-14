import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBookingSchoolComponent } from './admin-booking-school.component';

describe('AdminBookingSchoolComponent', () => {
  let component: AdminBookingSchoolComponent;
  let fixture: ComponentFixture<AdminBookingSchoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBookingSchoolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBookingSchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
