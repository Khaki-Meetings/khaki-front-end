import {createReducer} from '@ngrx/store';


export const spinnerFeatureKey = 'spinner';

export const spinnerReducer = createReducer(
  false
);

