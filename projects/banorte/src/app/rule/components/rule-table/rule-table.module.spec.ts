import { RuleTableModule } from './rule-table.module';

describe('RuleTableModule', () => {
  let ruleTableModule: RuleTableModule;

  beforeEach(() => {
    ruleTableModule = new RuleTableModule();
  });

  it('should create an instance', () => {
    expect(ruleTableModule).toBeTruthy();
  });
});
