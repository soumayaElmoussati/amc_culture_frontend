import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewHassan2AwardComponent } from './new-hassan2-award.component';

describe('NewHassan2AwardComponent', () => {
  let component: NewHassan2AwardComponent;
  let fixture: ComponentFixture<NewHassan2AwardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewHassan2AwardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewHassan2AwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
