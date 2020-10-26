import {ActionReducerMap, MetaReducer} from '@ngrx/store';
import {organizersStatisticsFeatureKey, organizersStatisticsReducer} from './reducers/organizers-statistics.reducer';
import {perDepartmentStatisticsFeatureKey, perDepartmentStatisticsReducer} from './reducers/per-department-statistics.reducer';
import {timeBlockSummariesFeatureKey, timeBlockSummariesReducer} from './reducers/time-block-summaries.reducer';
import {trailingStatisticsFeatureKey, trailingStatisticsReducer} from './reducers/trailing-statistics.reducer';
import {spinnerFeatureKey, spinnerReducer} from './reducers/spinner.reducer';
import {StatisticsFeature} from './models/statistics-feature';

export const khakiStatisticsFeatureKey = 'khakiStatistics';

export const reducers: ActionReducerMap<StatisticsFeature> = {
  [organizersStatisticsFeatureKey]: organizersStatisticsReducer,
  [perDepartmentStatisticsFeatureKey]: perDepartmentStatisticsReducer,
  [timeBlockSummariesFeatureKey]: timeBlockSummariesReducer,
  [trailingStatisticsFeatureKey]: trailingStatisticsReducer,
  [spinnerFeatureKey]: spinnerReducer
};


export const metaReducers: MetaReducer<StatisticsFeature>[] = [];
