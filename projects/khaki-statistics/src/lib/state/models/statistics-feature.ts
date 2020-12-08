import {organizersStatisticsFeatureKey} from '../reducers/organizers-statistics.reducer';
import {OrganizersStatisticsSm} from './organizers-statistics-sm';
import {perDepartmentStatisticsFeatureKey} from '../reducers/per-department-statistics.reducer';
import {DepartmentsStatisticsSm} from './departments-statistics-sm';
import {timeBlockSummariesFeatureKey} from '../reducers/time-block-summary.reducer';
import {TimeBlockSummarySm} from './time-block-summary-sm';
import {trailingStatisticsFeatureKey} from '../reducers/trailing-statistics.reducer';
import {TrailingStatisticsSm} from './trailing-statistics-sm';
import {spinnerFeatureKey} from '../reducers/spinner.reducer';
import {SpinnerSm} from './spinner-sm';
import {currentTimeIntervalFeatureKey} from '../reducers/current-time-interval.reducer';
import {IntervalEnum} from '../../services/models/interval.enum';

export interface StatisticsFeature {
  [organizersStatisticsFeatureKey]: OrganizersStatisticsSm;
  [perDepartmentStatisticsFeatureKey]: DepartmentsStatisticsSm;
  [timeBlockSummariesFeatureKey]: TimeBlockSummarySm;
  [trailingStatisticsFeatureKey]: TrailingStatisticsSm;
  [spinnerFeatureKey]: SpinnerSm;
  [currentTimeIntervalFeatureKey]: IntervalEnum;
}
