import { TestBed } from '@angular/core/testing';

import { SocketCommService } from './socket-comm.service';

describe('SocketCommService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SocketCommService = TestBed.get(SocketCommService);
    expect(service).toBeTruthy();
  });
});
