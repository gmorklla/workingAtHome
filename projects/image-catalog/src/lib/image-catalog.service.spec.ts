import { TestBed } from '@angular/core/testing';

import { ImageCatalogService } from './image-catalog.service';

describe('ImageCatalogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImageCatalogService = TestBed.get(ImageCatalogService);
    expect(service).toBeTruthy();
  });
});
