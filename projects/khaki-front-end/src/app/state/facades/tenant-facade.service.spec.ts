import { TestBed } from '@angular/core/testing';

import { TenantFacadeService } from './tenant-facade.service';
import {provideMockStore} from '@ngrx/store/testing';

describe('TenantKeyFacadeService', () => {
  let service: TenantFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore()]
    });
    service = TestBed.inject(TenantFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
