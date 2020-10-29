import {organizersStatisticsFeatureKey} from '../reducers/organizers-statistics.reducer';
import {OrganizersStatistics} from './organizers-statistics';
import {perDepartmentStatisticsFeatureKey} from '../reducers/per-department-statistics.reducer';
import {PerDepartmentStatistics} from './per-department-statistics';
import {timeBlockSummariesFeatureKey} from '../reducers/time-block-summaries.reducer';
import {TimeBlockSummarySm} from './time-block-summary-sm';
import {trailingStatisticsFeatureKey} from '../reducers/trailing-statistics.reducer';
import {TrailingStatistics} from './trailing-statistics';
import {spinnerFeatureKey} from '../reducers/spinner.reducer';

export interface StatisticsFeature {
  [organizersStatisticsFeatureKey]: OrganizersStatistics;
  [perDepartmentStatisticsFeatureKey]: PerDepartmentStatistics;
  [timeBlockSummariesFeatureKey]: TimeBlockSummarySm;
  [trailingStatisticsFeatureKey]: TrailingStatistics;
  [spinnerFeatureKey]: boolean;
}
