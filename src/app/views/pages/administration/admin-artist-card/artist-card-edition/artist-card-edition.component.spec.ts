import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistCardEditionComponent } from './artist-card-edition.component';

describe('ArtistCardEditionComponent', () => {
  let component: ArtistCardEditionComponent;
  let fixture: ComponentFixture<ArtistCardEditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtistCardEditionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistCardEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
