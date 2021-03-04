import {createReducer, on} from '@ngrx/store';
import {loadMeetingsListAction, loadMeetingsListFailureAction, loadMeetingsListSuccessAction} from '../actions/meetings-list.actions';
import {MeetingsListSm} from '../models/meetings-list-sm';
import {HistorianService, LogLevel} from '@natr/historian';

const logger = new HistorianService(LogLevel.DEBUG, 'MeetingsListReducer');

export const meetingsListFeatureKey = 'meetingsList';

export const initialState: MeetingsListSm = {
  content: [],
  number: 0,
  loading: false
};

export const meetingsListReducer = createReducer(
  initialState,
  on(
    loadMeetingsListAction,
    (state: MeetingsListSm, action) => {
      const newState = {...state};
      newState.loading = true;
      return newState;
    }
  ),
  on(
    loadMeetingsListFailureAction,
    (state, action) => {
      const newState = {...state};
      newState.error = {...action};
      newState.loading = false;
      return newState;
    }
  ),
  on(
    loadMeetingsListSuccessAction,
    (state: MeetingsListSm, action) => {
      const {type, ...newState} = {...state, ...action};
      newState.content = newState.content.map(
        meetingList => {
          return {
            organizerFirstName: meetingList.organizerFirstName,
            organizerLastName: meetingList.organizerLastName,
            totalCost: meetingList.totalCost,
            totalMeetings: meetingList.totalMeetings,
            totalSeconds: meetingList.totalSeconds,
            organizerEmail: meetingList.organizerEmail,
            start: meetingList.start,
            end: meetingList.end,
            summary: meetingList.summary,
            numberInternalAttendees: meetingList.numberInternalAttendees
          };
        }
      );
      newState.loading = false;
      return newState;
    }
  ),
);
