import { TestBed } from '@angular/core/testing';

import { DeleteUserAddressService } from './delete-user-address.service';

describe('DeleteUserAddressService', () => {
  let service: DeleteUserAddressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteUserAddressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
