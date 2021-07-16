import { createAction, props } from '@ngrx/store';
import {PageableActionProps} from '../models/action-props/pageable-action-props';

export const setMeetingsTablePageablesAction = createAction(
  '[MeetingsTablePageable] Load MeetingsTablePageables',
  props<PageableActionProps>()
);
