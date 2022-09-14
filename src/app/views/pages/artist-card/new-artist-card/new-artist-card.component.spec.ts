import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewArtistCardComponent } from './new-artist-card.component';

describe('NewArtistCardComponent', () => {
  let component: NewArtistCardComponent;
  let fixture: ComponentFixture<NewArtistCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewArtistCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewArtistCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
