import { TestBed } from '@angular/core/testing';

import { RuleExpressionDialogService } from './rule-expression-dialog.service';

describe('RuleExpressionDialogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RuleExpressionDialogService = TestBed.get(RuleExpressionDialogService);
    expect(service).toBeTruthy();
  });
});
