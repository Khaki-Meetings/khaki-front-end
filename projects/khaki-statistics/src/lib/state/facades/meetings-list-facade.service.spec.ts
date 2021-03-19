import { TestBed } from '@angular/core/testing';

import { MeetingsListFacadeService } from './meetings-list-facade.service';

describe('MeetingsListService', () => {
  let service: MeetingsListFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeetingsListFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
