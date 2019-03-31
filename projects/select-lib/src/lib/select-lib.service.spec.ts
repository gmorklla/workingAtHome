import { TestBed } from '@angular/core/testing';

import { SelectLibService } from './select-lib.service';

describe('SelectLibService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SelectLibService = TestBed.get(SelectLibService);
    expect(service).toBeTruthy();
  });
});
