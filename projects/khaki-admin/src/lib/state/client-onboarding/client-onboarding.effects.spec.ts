import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ClientOnboardingEffects } from './client-onboarding.effects';

describe('ClientOnboardingEffects', () => {
  let actions$: Observable<any>;
  let effects: ClientOnboardingEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ClientOnboardingEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(ClientOnboardingEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
