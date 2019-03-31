import { TestBed } from '@angular/core/testing';

import { RenderButtonService } from './render-button.service';

describe('RenderButtonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RenderButtonService = TestBed.get(RenderButtonService);
    expect(service).toBeTruthy();
  });
});
