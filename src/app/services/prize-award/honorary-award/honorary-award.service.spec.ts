import { TestBed } from '@angular/core/testing';

import { HonoraryAwardService } from './honorary-award.service';

describe('HonoraryAwardService', () => {
  let service: HonoraryAwardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HonoraryAwardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
