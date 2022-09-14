import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewHonoraryAwardComponent } from './new-honorary-award.component';

describe('NewHonoraryAwardComponent', () => {
  let component: NewHonoraryAwardComponent;
  let fixture: ComponentFixture<NewHonoraryAwardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewHonoraryAwardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewHonoraryAwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
