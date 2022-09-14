import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPrintingComponent } from './new-printing.component';

describe('NewPrintingComponent', () => {
  let component: NewPrintingComponent;
  let fixture: ComponentFixture<NewPrintingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPrintingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPrintingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
