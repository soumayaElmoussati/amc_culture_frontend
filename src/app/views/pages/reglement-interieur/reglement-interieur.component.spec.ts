import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReglementInterieurComponent } from './reglement-interieur.component';

describe('ReglementInterieurComponent', () => {
  let component: ReglementInterieurComponent;
  let fixture: ComponentFixture<ReglementInterieurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReglementInterieurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReglementInterieurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
