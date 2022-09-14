import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Hassan2AwardDetailComponent } from './hassan2-award-detail.component';

describe('Hassan2AwardDetailComponent', () => {
  let component: Hassan2AwardDetailComponent;
  let fixture: ComponentFixture<Hassan2AwardDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Hassan2AwardDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Hassan2AwardDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
