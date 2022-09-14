import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBookAwardComponent } from './new-book-award.component';

describe('NewBookAwardComponent', () => {
  let component: NewBookAwardComponent;
  let fixture: ComponentFixture<NewBookAwardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewBookAwardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBookAwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
