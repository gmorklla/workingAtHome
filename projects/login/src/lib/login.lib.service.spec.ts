import { TestBed } from '@angular/core/testing';

import { LoginLibService } from './login.lib.service';

describe('LoginLibService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoginLibService = TestBed.get(LoginLibService);
    expect(service).toBeTruthy();
  });
});
