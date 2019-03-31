import { TestBed } from '@angular/core/testing';

import { ThresholdColorService } from './threshold-color.service';

describe('ThresholdColorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ThresholdColorService = TestBed.get(ThresholdColorService);
    expect(service).toBeTruthy();
  });
});
