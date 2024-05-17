import { TestBed } from '@angular/core/testing';

import { HandleTokenService } from './handle-token.service';

describe('HandleTokenService', () => {
  let service: HandleTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HandleTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
