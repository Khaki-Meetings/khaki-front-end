import {createReducer, on} from '@ngrx/store';
import {TrailingStatisticsSm} from '../models/trailing-statistics-sm';
import {loadTrailingStatisticsSuccess} from '../actions/trailing-statistics.actions';

export const trailingStatisticsFeatureKey = 'trailingStatistics';

export const initialState: TrailingStatisticsSm = {
  timeBlockSummaries: []
};

export const trailingStatisticsReducer = createReducer(
  initialState,
  on(
    loadTrailingStatisticsSuccess,
    (state, action) => {
      const {type, ...newState} = {...state, ...action};
      return newState;
    }
  )
);

