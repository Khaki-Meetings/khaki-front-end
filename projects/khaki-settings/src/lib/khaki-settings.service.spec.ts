import { TestBed } from '@angular/core/testing';

import { KhakiSettingsService } from './khaki-settings.service';

describe('KhakiSettingsService', () => {
  let service: KhakiSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KhakiSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
