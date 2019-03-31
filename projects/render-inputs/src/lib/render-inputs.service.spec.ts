import { TestBed } from '@angular/core/testing';

import { RenderInputsService } from './render-inputs.service';

describe('RenderInputsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RenderInputsService = TestBed.get(RenderInputsService);
    expect(service).toBeTruthy();
  });
});
