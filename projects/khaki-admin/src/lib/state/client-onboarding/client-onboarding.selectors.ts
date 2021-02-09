import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromClientOnboarding from './client-onboarding.reducer';

export const selectClientOnboardingState = createFeatureSelector<fromClientOnboarding.ClientOnboardingSm>(
  fromClientOnboarding.clientOnboardingAttributeKey
);
