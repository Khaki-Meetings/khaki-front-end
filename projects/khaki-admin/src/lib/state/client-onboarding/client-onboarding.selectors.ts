import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromClientOnboarding from './client-onboarding.reducer';
import {CurrentLogLevel, HistorianService} from '@natr/historian';
import {khakiAdminFeatureKey} from '../index';
import {clientOnboardingAttributeKey} from './client-onboarding.reducer';

// noinspection JSUnusedLocalSymbols
const logger = new HistorianService(CurrentLogLevel.LOG_LEVEL, 'ClientOnboardingSelectors');

export const clientOnboardingSelector = createFeatureSelector<fromClientOnboarding.ClientOnboardingSm>(
  khakiAdminFeatureKey
);

export const errorMessageSelector = createSelector(
  clientOnboardingSelector,
  state => {
    logger.debug('state is', state);
    return state && state[clientOnboardingAttributeKey] && state[clientOnboardingAttributeKey].errorMessage;
  }
);
