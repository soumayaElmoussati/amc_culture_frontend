import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewWriterComponent } from './new-writer.component';

describe('NewWriterComponent', () => {
  let component: NewWriterComponent;
  let fixture: ComponentFixture<NewWriterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewWriterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewWriterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
