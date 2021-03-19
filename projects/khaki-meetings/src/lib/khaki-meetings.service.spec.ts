import { TestBed } from '@angular/core/testing';

import { KhakiMeetingsService } from './khaki-meetings.service';

describe('KhakiMeetingsService', () => {
  let service: KhakiMeetingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KhakiMeetingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
