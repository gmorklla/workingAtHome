import { TestBed } from '@angular/core/testing';

import { DivMessageService } from './div-message.service';

describe('DivMessageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DivMessageService = TestBed.get(DivMessageService);
    expect(service).toBeTruthy();
  });
});
