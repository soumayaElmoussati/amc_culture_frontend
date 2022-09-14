import { TestBed } from '@angular/core/testing';

import { BackendService } from './BackendService.service';

describe('DemandeExposantService', () => {
  let service: BackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
