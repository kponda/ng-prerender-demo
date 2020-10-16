import { TestBed } from '@angular/core/testing';

import { FirebaseCmsLibService } from './firebase-cms-lib.service';

describe('FirebaseCmsLibService', () => {
  let service: FirebaseCmsLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseCmsLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
