import { TestBed } from '@angular/core/testing';

import { UserMoreDetailsService } from './user-more-details.service';

describe('UserMoreDetailsService', () => {
  let service: UserMoreDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserMoreDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
