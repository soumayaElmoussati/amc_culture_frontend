import { TestBed } from '@angular/core/testing';

import { SielService } from './siel.service';

describe('SielService', () => {
  let service: SielService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SielService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
