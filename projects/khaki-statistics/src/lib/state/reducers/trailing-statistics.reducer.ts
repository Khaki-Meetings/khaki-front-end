import {createReducer, on} from '@ngrx/store';
import {TrailingStatisticsSm} from '../models/trailing-statistics-sm';
import {loadTrailingStatistics, loadTrailingStatisticsFailure, loadTrailingStatisticsSuccess} from '../actions/trailing-statistics.actions';
import { TrailingStatisticsAggSm } from '../models/trailing-statistics-agg-sm';

export const trailingStatisticsFeatureKey = 'trailingStatistics';

export const initialDeptState: TrailingStatisticsSm = {
  timeBlockSummaries: [],
  loading: false
};

export const initialState: TrailingStatisticsAggSm = {
  internal: initialDeptState,
  external: initialDeptState,
  loading: false
};

export const trailingStatisticsReducer = createReducer(
  initialState,
  on(
    loadTrailingStatisticsSuccess,
    (state, action) =>
      ({
        ...state,
        internal: action.internal,
        external: action.external,
        loading: false
      })
  ),
  on(loadTrailingStatisticsFailure, state => ({...state, loading: false})),
  on(loadTrailingStatistics, state => ({...state, loading: true}))
);
