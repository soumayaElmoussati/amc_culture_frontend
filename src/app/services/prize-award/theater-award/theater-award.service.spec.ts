import { TestBed } from '@angular/core/testing';

import { TheaterAwardService } from './theater-award.service';

describe('TheaterAwardService', () => {
  let service: TheaterAwardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TheaterAwardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
