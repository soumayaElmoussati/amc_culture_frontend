import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeExposantComponent } from './demande-exposant.component';

describe('DemandeExposantComponent', () => {
  let component: DemandeExposantComponent;
  let fixture: ComponentFixture<DemandeExposantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandeExposantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeExposantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
