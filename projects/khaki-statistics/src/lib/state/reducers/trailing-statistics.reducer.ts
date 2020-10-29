import {createReducer} from '@ngrx/store';
import {TrailingStatisticsSm} from '../models/trailing-statistics-sm';

export const trailingStatisticsFeatureKey = 'trailingStatistics';

export const initialState: TrailingStatisticsSm = {};


export const trailingStatisticsReducer = createReducer(
  initialState,
);

