import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HonoraryAwardListComponent } from './honorary-award-list.component';

describe('HonoraryAwardListComponent', () => {
  let component: HonoraryAwardListComponent;
  let fixture: ComponentFixture<HonoraryAwardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HonoraryAwardListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HonoraryAwardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
