import { TestBed } from '@angular/core/testing';

import { TenantKeyFacadeService } from './tenant-key-facade.service';

describe('TenantKeyFacadeService', () => {
  let service: TenantKeyFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TenantKeyFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
