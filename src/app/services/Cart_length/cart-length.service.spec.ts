import { TestBed } from '@angular/core/testing';

import { CartLengthService } from './cart-length.service';

describe('CartLengthService', () => {
  let service: CartLengthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartLengthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
