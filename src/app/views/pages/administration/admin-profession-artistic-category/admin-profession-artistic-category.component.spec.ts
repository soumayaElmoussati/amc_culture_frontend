import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProfessionArtisticCategoryComponent } from './admin-profession-artistic-category.component';

describe('AdminProfessionArtisticCategoryComponent', () => {
  let component: AdminProfessionArtisticCategoryComponent;
  let fixture: ComponentFixture<AdminProfessionArtisticCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProfessionArtisticCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProfessionArtisticCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
