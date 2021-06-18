import {spinnerAttributeKey} from '../reducers/spinner.reducer';
import {SpinnerSm} from './spinner-sm';
import {teamMembersTablePageableAttributeKey, TeamMembersTablePageableSm} from '../team-members-table-pageable/team-members-table-pageable.reducer';
import {StatisticsFiltersSm} from '../statistics-filters/statistics-filters-sm';
import {statisticsFiltersAttributeKey} from '../statistics-filters/statistics-filters.reducer';
// import { TeamMembersSm } from './team-members-sm';
//import { teamMembersFeatureKey } from '../reducers/team-members.reducer';

export interface KhakiStatisticsFeatureSm {
  [spinnerAttributeKey]: SpinnerSm;
//  [teamMembersTablePageableAttributeKey]: TeamMembersTablePageableSm;
//  [teamMembersFeatureKey]: TeamMembersSm;
  [statisticsFiltersAttributeKey]: StatisticsFiltersSm;
}
