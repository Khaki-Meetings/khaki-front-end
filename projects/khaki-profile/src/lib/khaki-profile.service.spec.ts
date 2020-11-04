import { TestBed } from '@angular/core/testing';

import { KhakiProfileService } from './khaki-profile.service';

describe('KhakiProfileService', () => {
  let service: KhakiProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KhakiProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
