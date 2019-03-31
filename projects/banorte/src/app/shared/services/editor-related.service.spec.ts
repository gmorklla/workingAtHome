import { TestBed } from '@angular/core/testing';

import { EditorRelatedService } from './editor-related.service';

describe('EditorRelatedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditorRelatedService = TestBed.get(EditorRelatedService);
    expect(service).toBeTruthy();
  });
});
