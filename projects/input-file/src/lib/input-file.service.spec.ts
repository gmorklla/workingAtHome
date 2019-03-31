import { TestBed } from '@angular/core/testing';

import { InputFileService } from './input-file.service';

describe('InputFileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InputFileService = TestBed.get(InputFileService);
    expect(service).toBeTruthy();
  });
});
