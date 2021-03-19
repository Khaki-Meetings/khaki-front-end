import { createAction, props } from '@ngrx/store';
import {SetOrganizerActionProps} from './set-organizer-action-props';

export const setOrganizerAction = createAction(
  '[Khaki Statistics] Set Organizer',
  props<SetOrganizerActionProps>()
);
