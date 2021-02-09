import { Action, createReducer, on } from '@ngrx/store';
import * as ClientOnboardingActions from './client-onboarding.actions';

export const clientOnboardingAttributeKey = 'clientOnboarding';

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
  on(ClientOnboardingActions.saveClientOnboardingSuccess, (state, action) => state),
  on(ClientOnboardingActions.saveClientOnboardingFailure, (state, action) => state),
);

