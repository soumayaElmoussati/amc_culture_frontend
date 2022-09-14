import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotePublicationComponent } from './vote-publication.component';

describe('VotePublicationComponent', () => {
  let component: VotePublicationComponent;
  let fixture: ComponentFixture<VotePublicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VotePublicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VotePublicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
