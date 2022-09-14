import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeCooperativeAccountComponent } from './demande-cooperative-account.component';

describe('DemandeCooperativeAccountComponent', () => {
  let component: DemandeCooperativeAccountComponent;
  let fixture: ComponentFixture<DemandeCooperativeAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandeCooperativeAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeCooperativeAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
