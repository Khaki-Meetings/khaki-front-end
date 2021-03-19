import {createAction, props} from '@ngrx/store';
import {MeetingsListSm} from '../models/meetings-list-sm';
import {ErrorSm} from '../models/error-sm';

export const loadMeetingsListAction = createAction(
  '[MeetingsList] Load MeetingsList',
);

export const loadMeetingsListSuccessAction = createAction(
  '[MeetingsList] Load MeetingsList Success',
  props<MeetingsListSm>()
);

export const loadMeetingsListFailureAction = createAction(
  '[MeetingsList] Load MeetingsList Failure',
  props<ErrorSm>()
);
