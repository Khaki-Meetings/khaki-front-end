import {Action, createReducer, on} from '@ngrx/store';
import * as ClientOnboardingActions from './client-onboarding.actions';
import {CurrentLogLevel, HistorianService} from '@natr/historian';

export const clientOnboardingAttributeKey = 'clientOnboarding';

const logger = new HistorianService(CurrentLogLevel.LOG_LEVEL, 'ClientOnboardingReducer');

export interface ClientOnboardingSm {
  errorMessage?: string;
  errorCode?: number;
  spinner: boolean;
}

export const initialState: ClientOnboardingSm = {
  spinner: false
};


export const clientOnboardingReducer = createReducer(
  initialState,
  on(ClientOnboardingActions.saveClientOnboarding, (state, action) => {
      logger.debug('saveClientOnboarding state', state);
      const newState = {...state, spinner: true, errorCode: undefined, errorMessage: undefined};
      logger.debug('saveClientOnboarding newState', newState);
      return newState;
    }
  ),
  on(ClientOnboardingActions.saveClientOnboardingSuccess, (state, action) => {
    logger.debug('saveClientOnboardingSuccess state', state);
    return {...state, spinner: false, errorCode: undefined, errorMessage: undefined};
  }),
  on(ClientOnboardingActions.saveClientOnboardingFailure, (state, action) => {
    logger.debug('saveClientOnboardingFailure state', state);
    const newState = {...state, spinner: false, errorCode: action.errorCode, errorMessage: action.errorMessage};
    logger.debug('saveClientOnboardingFailure newState', newState);
    return newState;
  }),
);

