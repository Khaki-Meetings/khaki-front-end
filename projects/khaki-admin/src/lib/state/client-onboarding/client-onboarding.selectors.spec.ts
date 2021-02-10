import * as fromClientOnboarding from './client-onboarding.reducer';
import { clientOnboardingSelector } from './client-onboarding.selectors';
import {KhakiAdminSm} from '../index';

describe('ClientOnboarding Selectors', () => {
  it('should select the feature state', () => {
    const result = clientOnboardingSelector({
      [fromClientOnboarding.clientOnboardingAttributeKey]: {
      }
    });

    // expect(result).toEqual({});
  });
});
