import {createReducer, on} from '@ngrx/store';
import {HistorianService, LogLevel} from '@natr/historian';
import { TeamMembersSm } from '../models/team-members-sm';
import { loadTeamMembersAction, loadTeamMembersFailureAction, loadTeamMembersSuccessAction } from '../actions/team-members.actions';

const logger = new HistorianService(LogLevel.DEBUG, 'OrganizersStatisticsReducer');

export const teamMembersFeatureKey = 'teamMembers';

export const initialState: TeamMembersSm = {
  content: [],
  number: 0,
  loading: false
};

export const teamMembersReducer = createReducer(
  initialState,
  on(
    loadTeamMembersAction,
    (state: TeamMembersSm, action) => {
      logger.debug('teamMembersReducer loadTeamMembersAction');
      const newState = {...state};
      newState.loading = true;
      return newState;
    }
  ),
  on(
    loadTeamMembersFailureAction,
    (state, action) => {
      logger.debug('teamMembersReducer loadTeamMembersFailureAction');
      const newState = {...state};
      newState.error = {...action};
      newState.loading = false;
      return newState;
    }
  ),
  on(
    loadTeamMembersSuccessAction,
    (state: TeamMembersSm, action) => {
      logger.debug('teamMembersReducer loadTeamMembersSuccessAction');

      const {type, ...newState} = {...state, ...action};
      newState.content = newState.content.map(
        teamMember => {
          return {
            id: teamMember.id,
            avatar: teamMember.avatarUrl,
            firstName: teamMember.firstName,
            lastName: teamMember.lastName,
            email: teamMember.email,
            department: teamMember.department,
            totalMeetings: teamMember.totalMeetings,
            totalSeconds: teamMember.totalSeconds
          };
        }
      );
      newState.loading = false;
      return newState;
    }
  ),
);
