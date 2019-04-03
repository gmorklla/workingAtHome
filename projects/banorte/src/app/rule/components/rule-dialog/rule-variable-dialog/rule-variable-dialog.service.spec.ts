import { TestBed } from '@angular/core/testing';

import { RuleVariableDialogService } from './rule-variable-dialog.service';

describe('RuleVariableDialogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RuleVariableDialogService = TestBed.get(RuleVariableDialogService);
    expect(service).toBeTruthy();
  });
});
