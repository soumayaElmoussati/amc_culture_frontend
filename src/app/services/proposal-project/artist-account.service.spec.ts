import { TestBed } from '@angular/core/testing';

import { ArtistAccountService } from './artist-account.service';

describe('ArtistAccountService', () => {
  let service: ArtistAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArtistAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
