import { TestBed } from '@angular/core/testing';

import { SpinnerFacadeService } from './spinner-facade.service';

describe('SpinnerFacadeService', () => {
  let service: SpinnerFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpinnerFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
