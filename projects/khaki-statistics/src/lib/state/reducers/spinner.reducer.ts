import {createReducer} from '@ngrx/store';
import {SpinnerSm} from '../models/spinner-sm';

export const initialState = {isSpinning: false} as SpinnerSm;

export const spinnerAttributeKey = 'spinner';

export const spinnerReducer = createReducer(
  initialState
);

