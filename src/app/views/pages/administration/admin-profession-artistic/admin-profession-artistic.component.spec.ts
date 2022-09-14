import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProfessionArtisticComponent } from './admin-profession-artistic.component';

describe('AdminProfessionArtisticComponent', () => {
  let component: AdminProfessionArtisticComponent;
  let fixture: ComponentFixture<AdminProfessionArtisticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProfessionArtisticComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProfessionArtisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
