import {organizersStatisticsFeatureKey} from '../reducers/organizers-statistics.reducer';
import {OrganizersStatisticsSm} from './organizers-statistics-sm';
import {perDepartmentStatisticsFeatureKey} from '../reducers/per-department-statistics.reducer';
import {DepartmentsStatisticsSm} from './departments-statistics-sm';
import {timeBlockSummariesFeatureKey} from '../reducers/time-block-summary.reducer';
import {TimeBlockSummarySm} from './time-block-summary-sm';
import {trailingStatisticsFeatureKey} from '../reducers/trailing-statistics.reducer';
import {TrailingStatisticsSm} from './trailing-statistics-sm';
import {spinnerAttributeKey} from '../reducers/spinner.reducer';
import {SpinnerSm} from './spinner-sm';
import {organizersTablePageableAttributeKey, OrganizersTablePageableSm} from '../organizers-table-pageable/organizers-table-pageable.reducer';
import {StatisticsFiltersSm} from '../statistics-filters/statistics-filters-sm';
import {statisticsFiltersAttributeKey} from '../statistics-filters/statistics-filters.reducer';

export interface KhakiStatisticsFeatureSm {
  [organizersStatisticsFeatureKey]: OrganizersStatisticsSm;
  [perDepartmentStatisticsFeatureKey]: DepartmentsStatisticsSm;
  [timeBlockSummariesFeatureKey]: TimeBlockSummarySm;
  [trailingStatisticsFeatureKey]: TrailingStatisticsSm;
  [spinnerAttributeKey]: SpinnerSm;
  [organizersTablePageableAttributeKey]: OrganizersTablePageableSm;
  [statisticsFiltersAttributeKey]: StatisticsFiltersSm;
}
