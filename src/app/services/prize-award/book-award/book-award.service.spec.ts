import { TestBed } from '@angular/core/testing';

import { BookAwardService } from './book-award.service';

describe('BookAwardService', () => {
  let service: BookAwardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookAwardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
