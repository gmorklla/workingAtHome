import { TestBed } from '@angular/core/testing';

import { CleanTransformService } from './clean-transform.service';

describe('CleanTransformService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CleanTransformService = TestBed.get(CleanTransformService);
    expect(service).toBeTruthy();
  });
});
