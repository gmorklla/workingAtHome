import { RuleDialogModule } from './rule-dialog.module';

describe('RuleDialogModule', () => {
  let ruleDialogModule: RuleDialogModule;

  beforeEach(() => {
    ruleDialogModule = new RuleDialogModule();
  });

  it('should create an instance', () => {
    expect(ruleDialogModule).toBeTruthy();
  });
});
