import { TestBed } from '@angular/core/testing';

import { ImageComponentService } from './image-component.service';

describe('ImageComponentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImageComponentService = TestBed.get(ImageComponentService);
    expect(service).toBeTruthy();
  });
});
