import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminForeignExhibitorsComponent } from './admin-foreign-exhibitors.component';

describe('AdminForeignExhibitorsComponent', () => {
  let component: AdminForeignExhibitorsComponent;
  let fixture: ComponentFixture<AdminForeignExhibitorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminForeignExhibitorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminForeignExhibitorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
