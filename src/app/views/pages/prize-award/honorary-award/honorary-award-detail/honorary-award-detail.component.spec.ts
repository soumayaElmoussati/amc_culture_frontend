import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HonoraryAwardDetailComponent } from './honorary-award-detail.component';

describe('HonoraryAwardDetailComponent', () => {
  let component: HonoraryAwardDetailComponent;
  let fixture: ComponentFixture<HonoraryAwardDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HonoraryAwardDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HonoraryAwardDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
