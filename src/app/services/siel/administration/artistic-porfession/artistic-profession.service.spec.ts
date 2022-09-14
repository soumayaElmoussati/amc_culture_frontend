import { TestBed } from '@angular/core/testing';

import { ArtisticProfessionService } from './artistic-profession.service';

describe('ArtisticProfessionService', () => {
  let service: ArtisticProfessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArtisticProfessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
