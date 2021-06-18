import { TestBed } from '@angular/core/testing';

import { KhakiTeamsService } from './khaki-teams.service';

describe('KhakiTeamsService', () => {
  let service: KhakiTeamsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KhakiTeamsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
