import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicLibrariesListComponent } from './public-libraries-list.component';

describe('PublicLibrariesListComponent', () => {
  let component: PublicLibrariesListComponent;
  let fixture: ComponentFixture<PublicLibrariesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicLibrariesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicLibrariesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
