import { TestBed } from '@angular/core/testing';

import { AllStatisticsFacadeService } from './all-statistics-facade.service';

describe('AllStatisticsFacadeService', () => {
  let service: AllStatisticsFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllStatisticsFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
