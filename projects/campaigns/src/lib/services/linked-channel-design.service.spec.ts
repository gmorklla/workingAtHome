import { TestBed } from '@angular/core/testing';

import { LinkedChannelDesignService } from './linked-channel-design.service';

describe('LinkedChannelDesignService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LinkedChannelDesignService = TestBed.get(LinkedChannelDesignService);
    expect(service).toBeTruthy();
  });
});
