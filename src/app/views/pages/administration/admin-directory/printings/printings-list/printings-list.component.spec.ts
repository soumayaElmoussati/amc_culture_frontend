import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintingsListComponent } from './printings-list.component';

describe('PrintingsListComponent', () => {
  let component: PrintingsListComponent;
  let fixture: ComponentFixture<PrintingsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintingsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintingsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
