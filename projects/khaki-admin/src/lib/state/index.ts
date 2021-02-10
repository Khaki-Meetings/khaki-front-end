import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import {clientOnboardingAttributeKey, clientOnboardingReducer, ClientOnboardingSm} from './client-onboarding/client-onboarding.reducer';


export const khakiAdminFeatureKey = 'khakiAdmin';

export interface KhakiAdminSm {
  [clientOnboardingAttributeKey]: ClientOnboardingSm;
}

export const reducers: ActionReducerMap<KhakiAdminSm> = {
  [clientOnboardingAttributeKey]: clientOnboardingReducer
};


export const metaReducers: MetaReducer<KhakiAdminSm>[] = [];
