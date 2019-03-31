import { TestBed } from '@angular/core/testing';

import { RenderRadioService } from './render-radio.service';

describe('RenderRadioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RenderRadioService = TestBed.get(RenderRadioService);
    expect(service).toBeTruthy();
  });
});
