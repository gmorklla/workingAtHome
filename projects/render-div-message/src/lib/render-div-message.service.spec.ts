import { TestBed } from '@angular/core/testing';

import { RenderDivMessageService } from './render-div-message.service';

describe('RenderDivMessageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RenderDivMessageService = TestBed.get(RenderDivMessageService);
    expect(service).toBeTruthy();
  });
});
