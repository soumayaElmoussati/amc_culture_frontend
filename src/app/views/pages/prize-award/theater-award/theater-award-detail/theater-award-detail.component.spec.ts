import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheaterAwardDetailComponent } from './theater-award-detail.component';

describe('TheaterAwardDetailComponent', () => {
  let component: TheaterAwardDetailComponent;
  let fixture: ComponentFixture<TheaterAwardDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TheaterAwardDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TheaterAwardDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
