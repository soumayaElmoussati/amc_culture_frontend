import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CooperativeAccountComponent } from './cooperative-account.component';

describe('CooperativeAccountComponent', () => {
  let component: CooperativeAccountComponent;
  let fixture: ComponentFixture<CooperativeAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CooperativeAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CooperativeAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
