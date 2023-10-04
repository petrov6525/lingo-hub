import { TestBed } from '@angular/core/testing';

import { DictionaryListService } from './dictionary-list.service';

describe('DictionaryListService', () => {
  let service: DictionaryListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DictionaryListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
