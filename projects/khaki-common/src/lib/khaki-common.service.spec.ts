import { TestBed } from '@angular/core/testing';

import { KhakiCommonService } from './khaki-common.service';

describe('KhakiCommonService', () => {
  let service: KhakiCommonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KhakiCommonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
