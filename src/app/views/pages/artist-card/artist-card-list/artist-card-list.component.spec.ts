import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistCardListComponent } from './artist-card-list.component';

describe('ArtistCardListComponent', () => {
  let component: ArtistCardListComponent;
  let fixture: ComponentFixture<ArtistCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtistCardListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
