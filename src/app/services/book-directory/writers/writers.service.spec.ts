import { TestBed } from '@angular/core/testing';

import { WritersService } from './writers.service';

describe('WritersService', () => {
  let service: WritersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WritersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
