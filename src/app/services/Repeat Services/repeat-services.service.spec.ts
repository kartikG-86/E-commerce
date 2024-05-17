import { TestBed } from '@angular/core/testing';

import { RepeatServicesService } from './repeat-services.service';

describe('RepeatServicesService', () => {
  let service: RepeatServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepeatServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
