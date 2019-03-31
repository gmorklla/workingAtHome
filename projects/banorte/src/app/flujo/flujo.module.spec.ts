import { FlujoModule } from './flujo.module';

describe('FlujoModule', () => {
  let flujoModule: FlujoModule;

  beforeEach(() => {
    flujoModule = new FlujoModule();
  });

  it('should create an instance', () => {
    expect(flujoModule).toBeTruthy();
  });
});
