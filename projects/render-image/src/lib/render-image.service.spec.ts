import { TestBed } from '@angular/core/testing';

import { RenderImageService } from './render-image.service';

describe('RenderImageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RenderImageService = TestBed.get(RenderImageService);
    expect(service).toBeTruthy();
  });
});
