import {initialState, meetingsListReducer} from './meetings-list.reducer';
import {trailingStatisticsReducer} from './trailing-statistics.reducer';
import {
  loadMeetingsListAction,
  loadMeetingsListFailureAction,
  loadMeetingsListSuccessAction
} from '../actions/meetings-list.actions';
import {MeetingsListSm} from '../models/meetings-list-sm';

describe('MeetingsList Reducer', () => {
  describe(`${loadMeetingsListAction.type}`, () => {
    it('should return the previous state', () => {
      const action = loadMeetingsListAction();

      const result = meetingsListReducer(initialState, action);

      expect(result).toEqual(initialState);
    });
  });

  describe(`${loadMeetingsListSuccessAction.type}`, () => {
    it('should return the new state', () => {
      const meetingsList: MeetingsListSm = {
      };
      const action = loadMeetingsListSuccessAction(meetingsList);

      const result = meetingsListReducer(initialState, action);

      expect(result).toEqual({...initialState, ...meetingsList});
    });
  });

  describe(`${loadMeetingsListFailureAction.type}`, () => {
    it('should set error', () => {
      const meetingsList = {
        errors: [
          {message: 'you done messed up', name: '1d10t'}
        ]
      } as MeetingsListSm;
      const action = loadMeetingsListFailureAction(meetingsList.error);

      const result = trailingStatisticsReducer(initialState, action);

      expect(result).toEqual({...initialState, ...meetingsList});
    });
  });
});
