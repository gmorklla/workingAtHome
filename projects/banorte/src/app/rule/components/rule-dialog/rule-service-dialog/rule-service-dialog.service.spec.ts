import { TestBed } from '@angular/core/testing';

import { RuleServiceDialogService } from './rule-service-dialog.service';

describe('RuleServiceDialogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RuleServiceDialogService = TestBed.get(RuleServiceDialogService);
    expect(service).toBeTruthy();
  });
});
