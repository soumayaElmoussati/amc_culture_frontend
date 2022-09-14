import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPublicLibraryComponent } from './new-public-library.component';

describe('NewPublicLibraryComponent', () => {
  let component: NewPublicLibraryComponent;
  let fixture: ComponentFixture<NewPublicLibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPublicLibraryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPublicLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
