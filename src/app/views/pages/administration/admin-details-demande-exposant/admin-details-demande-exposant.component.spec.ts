import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDetailsDemandeExposantComponent } from './admin-details-demande-exposant.component';

describe('AdminDetailsDemandeExposantComponent', () => {
  let component: AdminDetailsDemandeExposantComponent;
  let fixture: ComponentFixture<AdminDetailsDemandeExposantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDetailsDemandeExposantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDetailsDemandeExposantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
