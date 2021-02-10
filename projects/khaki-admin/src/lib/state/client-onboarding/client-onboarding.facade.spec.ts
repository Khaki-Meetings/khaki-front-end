import { TestBed } from '@angular/core/testing';

import { ClientOnboardingFacade } from './client-onboarding.facade';

describe('ClientOnboardingFacadeService', () => {
  let service: ClientOnboardingFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientOnboardingFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
