import {createReducer} from '@ngrx/store';

export const initialState = false;

export const spinnerFeatureKey = 'spinner';

export const spinnerReducer = createReducer(
  initialState
);

