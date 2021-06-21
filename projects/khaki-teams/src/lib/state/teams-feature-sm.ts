import {spinnerAttributeKey} from './reducers/spinner.reducer';
import {SpinnerSm} from './models/spinner-sm';
import {StatisticsFiltersSm} from './statistics-filters/statistics-filters-sm';
import {statisticsFiltersAttributeKey} from './statistics-filters/statistics-filters.reducer';
import { teamMembersTablePageableAttributeKey, TeamMembersTablePageableSm } from './team-members-table-pageable/team-members-table-pageable.reducer';
import { teamMembersFeatureKey } from './reducers/team-members.reducer';
import { TeamMembersSm } from './models/team-members-sm';

export interface TeamsFeatureSm {
  [spinnerAttributeKey]: SpinnerSm;
  [teamMembersTablePageableAttributeKey]: TeamMembersTablePageableSm;
  [statisticsFiltersAttributeKey]: StatisticsFiltersSm;
  [teamMembersFeatureKey]: TeamMembersSm;
}
