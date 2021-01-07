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
    (state, action) =>
      ({
        ...state,
        loading: false,
        timeBlockSummaries: action.timeBlockSummaries,
        timeBlock: action.timeBlock
      })
  ),
  on(
    loadTrailingStatisticsFailure,
    (state, action) =>
      ({
        ...state,
        timeBlockSummaries: [],
        count: 0,
        loading: false
      })
  ),
  on(loadTrailingStatistics, state => ({...state, loading: true}))
);

