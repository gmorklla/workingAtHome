import { TestBed } from '@angular/core/testing';

import { ComponentesDinamicosService } from './componentes-dinamicos.service';

describe('ComponentesDinamicosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ComponentesDinamicosService = TestBed.get(ComponentesDinamicosService);
    expect(service).toBeTruthy();
  });
});
