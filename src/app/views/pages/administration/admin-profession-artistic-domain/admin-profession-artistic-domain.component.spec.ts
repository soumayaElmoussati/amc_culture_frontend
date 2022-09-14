import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProfessionArtisticDomainComponent } from './admin-profession-artistic-domain.component';

describe('AdminProfessionArtisticDomainComponent', () => {
  let component: AdminProfessionArtisticDomainComponent;
  let fixture: ComponentFixture<AdminProfessionArtisticDomainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProfessionArtisticDomainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProfessionArtisticDomainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
