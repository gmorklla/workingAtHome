import { TestBed } from '@angular/core/testing';

import { RenderSelectService } from './render-select.service';

describe('RenderSelectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RenderSelectService = TestBed.get(RenderSelectService);
    expect(service).toBeTruthy();
  });
});
