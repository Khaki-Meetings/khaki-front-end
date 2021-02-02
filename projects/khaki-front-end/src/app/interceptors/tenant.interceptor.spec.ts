import { TestBed } from '@angular/core/testing';

import { TenantInterceptor } from './tenant.interceptor';
import {provideMockStore} from '@ngrx/store/testing';

describe('TenantInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      TenantInterceptor,
      provideMockStore()
      ]
  }));

  it('should be created', () => {
    const interceptor: TenantInterceptor = TestBed.inject(TenantInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
