import { TestBed } from '@angular/core/testing';

import { HandleRequestService } from './handle-request.service';

describe('HandleRequestService', () => {
  let service: HandleRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HandleRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
