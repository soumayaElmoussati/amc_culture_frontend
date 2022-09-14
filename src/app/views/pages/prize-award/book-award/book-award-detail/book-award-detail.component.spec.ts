import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookAwardDetailComponent } from './book-award-detail.component';

describe('BookAwardDetailComponent', () => {
  let component: BookAwardDetailComponent;
  let fixture: ComponentFixture<BookAwardDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookAwardDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookAwardDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
