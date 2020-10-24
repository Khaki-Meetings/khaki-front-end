import {createReducer} from '@ngrx/store';
import {TrailingStatistics} from '../models/trailing-statistics';

export const trailingStatisticsFeatureKey = 'trailingStatistics';

export const initialState: TrailingStatistics = {};


export const trailingStatisticsReducer = createReducer(
  initialState,
);

