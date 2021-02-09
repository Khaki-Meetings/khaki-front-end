import * as fromClientOnboarding from './client-onboarding.reducer';
import { selectClientOnboardingState } from './client-onboarding.selectors';
import {KhakiAdminSm} from '../index';

describe('ClientOnboarding Selectors', () => {
  it('should select the feature state', () => {
    const result = selectClientOnboardingState(<KhakiAdminSm>{
      [fromClientOnboarding.clientOnboardingAttributeKey]: {
      }
    });

    expect(result).toEqual({});
  });
});
