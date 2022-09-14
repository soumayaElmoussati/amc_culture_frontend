import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTheaterAwardComponent } from './new-theater-award.component';

describe('NewTheaterAwardComponent', () => {
  let component: NewTheaterAwardComponent;
  let fixture: ComponentFixture<NewTheaterAwardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewTheaterAwardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTheaterAwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
