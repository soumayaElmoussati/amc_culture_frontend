import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrizeAwardComponent } from './prize-award.component';

describe('PrizeAwardComponent', () => {
  let component: PrizeAwardComponent;
  let fixture: ComponentFixture<PrizeAwardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrizeAwardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrizeAwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
