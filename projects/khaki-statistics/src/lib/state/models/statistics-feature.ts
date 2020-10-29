import {organizersStatisticsFeatureKey} from '../reducers/organizers-statistics.reducer';
import {OrganizersStatistics} from './organizers-statistics';
import {perDepartmentStatisticsFeatureKey} from '../reducers/per-department-statistics.reducer';
import {PerDepartmentStatisticsSm} from './per-department-statistics-sm';
import {timeBlockSummariesFeatureKey} from '../reducers/time-block-summaries.reducer';
import {TimeBlockSummarySm} from './time-block-summary-sm';
import {trailingStatisticsFeatureKey} from '../reducers/trailing-statistics.reducer';
import {TrailingStatisticsSm} from './trailing-statistics-sm';
import {spinnerFeatureKey} from '../reducers/spinner.reducer';

export interface StatisticsFeature {
  [organizersStatisticsFeatureKey]: OrganizersStatistics;
  [perDepartmentStatisticsFeatureKey]: PerDepartmentStatisticsSm;
  [timeBlockSummariesFeatureKey]: TimeBlockSummarySm;
  [trailingStatisticsFeatureKey]: TrailingStatisticsSm;
  [spinnerFeatureKey]: boolean;
}
