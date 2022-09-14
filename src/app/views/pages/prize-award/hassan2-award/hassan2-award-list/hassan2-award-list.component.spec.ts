import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Hassan2AwardListComponent } from './hassan2-award-list.component';

describe('Hassan2AwardListComponent', () => {
  let component: Hassan2AwardListComponent;
  let fixture: ComponentFixture<Hassan2AwardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Hassan2AwardListComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Hassan2AwardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
