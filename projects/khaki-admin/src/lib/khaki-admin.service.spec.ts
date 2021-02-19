import { TestBed } from '@angular/core/testing';

import { KhakiAdminService } from './khaki-admin.service';

describe('KhakiAdminService', () => {
  let service: KhakiAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KhakiAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
