import { TestBed } from '@angular/core/testing';

import { PublicLibrariesService } from './public-libraries.service';

describe('PublicLibrariesService', () => {
  let service: PublicLibrariesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublicLibrariesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
