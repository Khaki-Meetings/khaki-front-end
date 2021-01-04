import {ActionReducerMap, MetaReducer} from '@ngrx/store';
import {organizersStatisticsFeatureKey, organizersStatisticsReducer} from './reducers/organizers-statistics.reducer';
import {perDepartmentStatisticsFeatureKey, perDepartmentStatisticsReducer} from './reducers/per-department-statistics.reducer';
import {timeBlockSummariesFeatureKey, timeBlockSummaryReducer} from './reducers/time-block-summary.reducer';
import {trailingStatisticsFeatureKey, trailingStatisticsReducer} from './reducers/trailing-statistics.reducer';
import {spinnerFeatureKey, spinnerReducer} from './reducers/spinner.reducer';
import {StatisticsFeature} from './models/statistics-feature';
import {setStatisticsFilterReducer, statisticsFiltersFeatureKey} from './reducers/statistics-filters.reducer';

export const khakiStatisticsFeatureKey = 'khakiStatistics';

export const reducers: ActionReducerMap<StatisticsFeature> = {
  [organizersStatisticsFeatureKey]: organizersStatisticsReducer,
  [perDepartmentStatisticsFeatureKey]: perDepartmentStatisticsReducer,
  [timeBlockSummariesFeatureKey]: timeBlockSummaryReducer,
  [trailingStatisticsFeatureKey]: trailingStatisticsReducer,
  [spinnerFeatureKey]: spinnerReducer,
  [statisticsFiltersFeatureKey]: setStatisticsFilterReducer
};


export const metaReducers: MetaReducer<StatisticsFeature>[] = [];
