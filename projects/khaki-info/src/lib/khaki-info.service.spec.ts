import { TestBed } from '@angular/core/testing';

import { KhakiInfoService } from './khaki-info.service';

describe('KhakiInfoService', () => {
  let service: KhakiInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KhakiInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
