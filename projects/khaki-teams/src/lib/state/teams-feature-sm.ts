import {spinnerAttributeKey} from './reducers/spinner.reducer';
import {SpinnerSm} from './models/spinner-sm';
import {StatisticsFiltersSm} from './statistics-filters/statistics-filters-sm';
import {statisticsFiltersAttributeKey} from './statistics-filters/statistics-filters.reducer';
import { teamMembersTablePageableAttributeKey, TeamMembersTablePageableSm } from './team-members-table-pageable/team-members-table-pageable.reducer';
import { teamMembersFeatureKey } from './reducers/team-members.reducer';
import { TeamMembersSm } from './models/team-members-sm';
import { teamsFiltersAttributeKey } from './team-filters/teams-filters.reducer';
import { TeamsFiltersSm } from './team-filters/teams-filters-sm';
import { meetingsListFeatureKey } from './reducers/meetings-list.reducer';
import { MeetingsListSm } from './models/meetings-list-sm';
import { meetingsTablePageableAttributeKey, MeetingsTablePageableSm } from './meetings-table-pageable/meetings-table-pageable.reducer';

export interface TeamsFeatureSm {
  [spinnerAttributeKey]: SpinnerSm;
  [teamMembersTablePageableAttributeKey]: TeamMembersTablePageableSm;
  [meetingsTablePageableAttributeKey]: MeetingsTablePageableSm;
  [statisticsFiltersAttributeKey]: StatisticsFiltersSm;
  [teamMembersFeatureKey]: TeamMembersSm;
  [teamsFiltersAttributeKey]: TeamsFiltersSm;
  [meetingsListFeatureKey]: MeetingsListSm;
}
