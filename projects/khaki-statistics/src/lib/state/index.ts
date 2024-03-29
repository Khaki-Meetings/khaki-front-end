import {ActionReducerMap, MetaReducer} from '@ngrx/store';
import {organizersStatisticsFeatureKey, organizersStatisticsReducer} from './reducers/organizers-statistics.reducer';
import {meetingsListFeatureKey, meetingsListReducer} from './reducers/meetings-list.reducer';
import {perDepartmentStatisticsFeatureKey, perDepartmentStatisticsReducer} from './reducers/per-department-statistics.reducer';
import {timeBlockSummariesFeatureKey, timeBlockSummaryReducer} from './reducers/time-block-summary.reducer';
import {trailingStatisticsFeatureKey, trailingStatisticsReducer} from './reducers/trailing-statistics.reducer';
import {KhakiStatisticsFeatureSm} from './models/khaki-statistics-feature-sm';
import {
  organizersTablePageableAttributeKey,
  organizersTablePageableReducer
} from './organizers-table-pageable/organizers-table-pageable.reducer';
import {
  meetingsTablePageableAttributeKey,
  meetingsTablePageableReducer
} from './meetings-table-pageable/meetings-table-pageable.reducer';
import {statisticsFiltersAttributeKey, statisticsFiltersReducer} from './statistics-filters/statistics-filters.reducer';
import { organizersAggregateStatisticsFeatureKey, organizersAggregateStatisticsReducer } from './reducers/organizers-aggregate-statistics.reducer';
import { timeBlockSummaryGoalListReducer, timeBlockSummaryGoalsFeatureKey } from './reducers/time-block-summary-goal-list.reducer';
import { departmentsListFeatureKey, departmentsListReducer } from './reducers/departments-list.reducer';
import { spinnerAttributeKey, spinnerReducer } from './reducers/spinner.reducer';

export const khakiStatisticsFeatureKey = 'khakiStatistics';

export const khakiStatisticsReducers: ActionReducerMap<KhakiStatisticsFeatureSm> = {
  [organizersTablePageableAttributeKey]: organizersTablePageableReducer,
  [organizersStatisticsFeatureKey]: organizersStatisticsReducer,
  [organizersAggregateStatisticsFeatureKey]: organizersAggregateStatisticsReducer,
  [perDepartmentStatisticsFeatureKey]: perDepartmentStatisticsReducer,
  [timeBlockSummariesFeatureKey]: timeBlockSummaryReducer,
  [timeBlockSummaryGoalsFeatureKey]: timeBlockSummaryGoalListReducer,
  [trailingStatisticsFeatureKey]: trailingStatisticsReducer,
  [departmentsListFeatureKey]: departmentsListReducer,
  [spinnerAttributeKey]: spinnerReducer,
  [statisticsFiltersAttributeKey]: statisticsFiltersReducer,
  [meetingsTablePageableAttributeKey]: meetingsTablePageableReducer,
  [meetingsListFeatureKey]: meetingsListReducer,
};


export const khakiStatisticsMetaReducers: MetaReducer<KhakiStatisticsFeatureSm>[] = [];
