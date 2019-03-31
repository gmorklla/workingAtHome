import { TestBed } from '@angular/core/testing';

import { InputRangeService } from './input-range.service';

describe('InputRangeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InputRangeService = TestBed.get(InputRangeService);
    expect(service).toBeTruthy();
  });
});
