import { TestBed } from '@angular/core/testing';

import { LanguageCodeServiceService } from './language-code.service.service';

describe('LanguageCodeServiceService', () => {
  let service: LanguageCodeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LanguageCodeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
