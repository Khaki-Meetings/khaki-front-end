import { TestBed } from '@angular/core/testing';

import { TenantFacadeService } from './tenant-facade.service';

describe('TenantKeyFacadeService', () => {
  let service: TenantFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TenantFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
