import {organizersStatisticsFeatureKey} from '../reducers/organizers-statistics.reducer';
import {OrganizersStatisticsSm} from './organizers-statistics-sm';
import {perDepartmentStatisticsFeatureKey} from '../reducers/per-department-statistics.reducer';
import {DepartmentsStatisticsSm} from './departments-statistics-sm';
import {timeBlockSummariesFeatureKey} from '../reducers/time-block-summary.reducer';
import {TimeBlockSummarySm} from './time-block-summary-sm';
import {trailingStatisticsFeatureKey} from '../reducers/trailing-statistics.reducer';
import {TrailingStatisticsSm} from './trailing-statistics-sm';
import {organizersTablePageableAttributeKey, OrganizersTablePageableSm} from '../organizers-table-pageable/organizers-table-pageable.reducer';
import {StatisticsFiltersSm} from '../statistics-filters/statistics-filters-sm';
import {statisticsFiltersAttributeKey} from '../statistics-filters/statistics-filters.reducer';
import {meetingsListFeatureKey} from '../reducers/meetings-list.reducer';
import {MeetingsListSm} from './meetings-list-sm';
import {meetingsTablePageableAttributeKey, MeetingsTablePageableSm} from '../meetings-table-pageable/meetings-table-pageable.reducer';
import { TimeBlockSummaryAggSm } from './time-block-summary-agg-sm';
import { DepartmentsStatisticsAggSm } from './departments-statistics-agg-sm';
import { OrganizersAggregateStatisticsSm } from './organizers-aggregate-statistics-sm';
import { organizersAggregateStatisticsFeatureKey } from '../reducers/organizers-aggregate-statistics.reducer';
import { timeBlockSummaryGoalsFeatureKey } from '../reducers/time-block-summary-goal-list.reducer';
import { TimeBlockSummaryGoalSm } from './time-block-summary-goal-sm';
import { TimeBlockSummaryGoalListSm } from './time-block-summary-goal-list-sm';
import { departmentsListFeatureKey } from '../reducers/departments-list.reducer';
import { DepartmentsListSm } from './departments-list-sm';
import { spinnerAttributeKey } from '../reducers/spinner.reducer';
import { SpinnerSm } from './spinner-sm';

export interface KhakiStatisticsFeatureSm {
  [organizersStatisticsFeatureKey]: OrganizersStatisticsSm;
  [organizersAggregateStatisticsFeatureKey]: OrganizersAggregateStatisticsSm;
  [perDepartmentStatisticsFeatureKey]: DepartmentsStatisticsAggSm;
  [timeBlockSummariesFeatureKey]: TimeBlockSummarySm;
  [timeBlockSummaryGoalsFeatureKey]: TimeBlockSummaryGoalListSm,
  [trailingStatisticsFeatureKey]: TrailingStatisticsSm;
  [departmentsListFeatureKey]: DepartmentsListSm;
  [spinnerAttributeKey]: SpinnerSm;
  [organizersTablePageableAttributeKey]: OrganizersTablePageableSm;
  [statisticsFiltersAttributeKey]: StatisticsFiltersSm;
  [meetingsListFeatureKey]: MeetingsListSm;
  [meetingsTablePageableAttributeKey]: MeetingsTablePageableSm;
}
