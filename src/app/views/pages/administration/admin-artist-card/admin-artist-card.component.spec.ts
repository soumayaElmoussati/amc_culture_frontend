import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminArtistCardComponent } from './admin-artist-card.component';

describe('AdminArtistCardComponent', () => {
  let component: AdminArtistCardComponent;
  let fixture: ComponentFixture<AdminArtistCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminArtistCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminArtistCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
