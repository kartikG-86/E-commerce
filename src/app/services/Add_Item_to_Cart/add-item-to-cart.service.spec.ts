import { TestBed } from '@angular/core/testing';

import { AddItemToCartService } from './add-item-to-cart.service';

describe('AddItemToCartService', () => {
  let service: AddItemToCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddItemToCartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
