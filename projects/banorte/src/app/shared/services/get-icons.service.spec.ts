import { TestBed } from '@angular/core/testing';

import { GetIconsService } from './get-icons.service';

describe('GetIconsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetIconsService = TestBed.get(GetIconsService);
    expect(service).toBeTruthy();
  });
});
