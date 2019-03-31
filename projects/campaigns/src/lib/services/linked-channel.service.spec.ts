import { TestBed } from '@angular/core/testing';

import { LinkedChannelService } from './linked-channel.service';

describe('LinkedChannelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LinkedChannelService = TestBed.get(LinkedChannelService);
    expect(service).toBeTruthy();
  });
});
