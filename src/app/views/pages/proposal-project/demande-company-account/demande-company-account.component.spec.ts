import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeCompanyAccountComponent } from './demande-company-account.component';

describe('DemandeCompanyAccountComponent', () => {
  let component: DemandeCompanyAccountComponent;
  let fixture: ComponentFixture<DemandeCompanyAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandeCompanyAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeCompanyAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
