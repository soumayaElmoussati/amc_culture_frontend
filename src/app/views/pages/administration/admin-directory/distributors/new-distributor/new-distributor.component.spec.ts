import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDistributorComponent } from './new-distributor.component';

describe('NewDistributorComponent', () => {
  let component: NewDistributorComponent;
  let fixture: ComponentFixture<NewDistributorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewDistributorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDistributorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
