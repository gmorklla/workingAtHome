import { TestBed } from '@angular/core/testing';

import { InputCheckboxService } from './input-checkbox.service';

describe('InputCheckboxService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InputCheckboxService = TestBed.get(InputCheckboxService);
    expect(service).toBeTruthy();
  });
});
