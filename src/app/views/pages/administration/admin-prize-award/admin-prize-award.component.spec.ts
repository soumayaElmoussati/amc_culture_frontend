import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPrizeAwardComponent } from './admin-prize-award.component';

describe('AdminPrizeAwardComponent', () => {
  let component: AdminPrizeAwardComponent;
  let fixture: ComponentFixture<AdminPrizeAwardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPrizeAwardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPrizeAwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
