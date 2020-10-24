import {ActionReducerMap, MetaReducer} from '@ngrx/store';
import {organizersStatisticsFeatureKey, organizersStatisticsReducer} from './reducers/organizers-statistics.reducer';
import {OrganizersStatistics} from './models/organizers-statistics';
import {perDepartmentStatisticsFeatureKey, perDepartmentStatisticsReducer} from './reducers/per-department-statistics.reducer';
import {PerDepartmentStatistics} from './models/per-department-statistics';
import {timeBlockSummariesFeatureKey, timeBlockSummariesReducer} from './reducers/time-block-summaries.reducer';
import {TimeBlockSummary} from './models/time-block-summary';
import {trailingStatisticsFeatureKey, trailingStatisticsReducer} from './reducers/trailing-statistics.reducer';
import {TrailingStatistics} from './models/trailing-statistics';
import {spinnerFeatureKey, spinnerReducer} from './reducers/spinner.reducer';


export const khakiStatisticsFeatureKey = 'khakiStatistics';

export interface StatisticsFeature {
  [organizersStatisticsFeatureKey]: OrganizersStatistics;
  [perDepartmentStatisticsFeatureKey]: PerDepartmentStatistics;
  [timeBlockSummariesFeatureKey]: TimeBlockSummary;
  [trailingStatisticsFeatureKey]: TrailingStatistics;
  [spinnerFeatureKey]: boolean;
}

export const reducers: ActionReducerMap<StatisticsFeature> = {
  [organizersStatisticsFeatureKey]: organizersStatisticsReducer,
  [perDepartmentStatisticsFeatureKey]: perDepartmentStatisticsReducer,
  [timeBlockSummariesFeatureKey]: timeBlockSummariesReducer,
  [trailingStatisticsFeatureKey]: trailingStatisticsReducer,
  [spinnerFeatureKey]: spinnerReducer
};


export const metaReducers: MetaReducer<StatisticsFeature>[] = [];
