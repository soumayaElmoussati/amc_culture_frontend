import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookAwardListComponent } from './book-award-list.component';

describe('BookAwardListComponent', () => {
  let component: BookAwardListComponent;
  let fixture: ComponentFixture<BookAwardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookAwardListComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookAwardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
