import {createAction, props} from '@ngrx/store';
import {MeetingsListSm} from '../models/meetings-list-sm';
import {ErrorSm} from '../models/error-sm';

export const loadMeetingsListAction = createAction(
  '[TeamsMeetingsList] Load MeetingsList',
);

export const loadMeetingsListSuccessAction = createAction(
  '[TeamsMeetingsList] Load MeetingsList Success',
  props<MeetingsListSm>()
);

export const loadMeetingsListFailureAction = createAction(
  '[TeamsMeetingsList] Load MeetingsList Failure',
  props<ErrorSm>()
);
