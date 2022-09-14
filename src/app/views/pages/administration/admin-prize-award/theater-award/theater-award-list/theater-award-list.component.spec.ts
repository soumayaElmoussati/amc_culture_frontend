import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheaterAwardListComponent } from './theater-award-list.component';

describe('TheaterAwardListComponent', () => {
  let component: TheaterAwardListComponent;
  let fixture: ComponentFixture<TheaterAwardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TheaterAwardListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TheaterAwardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
