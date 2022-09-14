import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExposantRecapComponent } from './exposant-recap.component';

describe('ExposantRecapComponent', () => {
  let component: ExposantRecapComponent;
  let fixture: ComponentFixture<ExposantRecapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExposantRecapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExposantRecapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
