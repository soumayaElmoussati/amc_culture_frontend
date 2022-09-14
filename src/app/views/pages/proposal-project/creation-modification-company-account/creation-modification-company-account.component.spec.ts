import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationModificationCompanyAccountComponent } from './creation-modification-company-account.component';

describe('CreationModificationCompanyAccountComponent', () => {
  let component: CreationModificationCompanyAccountComponent;
  let fixture: ComponentFixture<CreationModificationCompanyAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreationModificationCompanyAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreationModificationCompanyAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
