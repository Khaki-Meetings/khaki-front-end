import {ActionReducerMap, MetaReducer} from '@ngrx/store';
import {spinnerAttributeKey, spinnerReducer} from './reducers/spinner.reducer';
import {
  teamMembersTablePageableAttributeKey,
  teamMembersTablePageableReducer
} from './team-members-table-pageable/team-members-table-pageable.reducer';
import {statisticsFiltersAttributeKey, statisticsFiltersReducer} from './statistics-filters/statistics-filters.reducer';
import { teamMembersFeatureKey, teamMembersReducer } from './reducers/team-members.reducer';
import { TeamsFeatureSm } from './teams-feature-sm';

export const teamsFeatureKey = 'teams';

export const reducers: ActionReducerMap<TeamsFeatureSm> = {
  [teamMembersTablePageableAttributeKey]: teamMembersTablePageableReducer,
  [teamMembersFeatureKey]: teamMembersReducer,
  [spinnerAttributeKey]: spinnerReducer,
  [statisticsFiltersAttributeKey]: statisticsFiltersReducer
};

export const metaReducers: MetaReducer<TeamsFeatureSm>[] = [];
