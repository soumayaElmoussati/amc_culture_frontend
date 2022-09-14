import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBookingStandComponent } from './admin-booking-stand.component';

describe('AdminBookingStandComponent', () => {
  let component: AdminBookingStandComponent;
  let fixture: ComponentFixture<AdminBookingStandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBookingStandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBookingStandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
