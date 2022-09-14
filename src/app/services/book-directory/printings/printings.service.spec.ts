import { TestBed } from '@angular/core/testing';

import { PrintingsService } from './printings.service';

describe('PrintingsService', () => {
  let service: PrintingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrintingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
