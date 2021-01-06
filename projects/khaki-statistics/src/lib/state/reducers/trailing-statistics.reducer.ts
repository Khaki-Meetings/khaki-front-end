import {createReducer, on} from '@ngrx/store';
import {TrailingStatisticsSm} from '../models/trailing-statistics-sm';
import {loadTrailingStatistics, loadTrailingStatisticsFailure, loadTrailingStatisticsSuccess} from '../actions/trailing-statistics.actions';

export const trailingStatisticsFeatureKey = 'trailingStatistics';

export const initialState: TrailingStatisticsSm = {
  timeBlockSummaries: [],
  loading: false
};

export const trailingStatisticsReducer = createReducer(
  initialState,
  on(
    loadTrailingStatisticsSuccess,
    (state, action) => {
      const {type, ...newState} = {...state, ...action};
      newState.loading = false;
      return newState;
    }
  ),
  on(
    loadTrailingStatisticsFailure,
    (state, action) => {
      const {type, ...newState} = {...state, ...action};
      newState.timeBlockSummaries = [];
      newState.count = 0;
      newState.loading = false;
      return newState;
    }
  ),
  on(
    loadTrailingStatistics,
    state => {
      const newState = {...state};
      newState.loading = true;
      return newState;
    }
  )
);

