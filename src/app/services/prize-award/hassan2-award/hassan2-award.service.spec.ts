import { TestBed } from '@angular/core/testing';

import { Hassan2AwardService } from './hassan2-award.service';

describe('Hassan2AwardService', () => {
  let service: Hassan2AwardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Hassan2AwardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
