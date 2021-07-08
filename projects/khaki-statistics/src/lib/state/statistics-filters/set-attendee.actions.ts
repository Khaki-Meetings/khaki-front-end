import { createAction, props } from '@ngrx/store';
import { SetAttendeeActionProps } from './set-attendee-action-props';

export const setAttendeeAction = createAction(
  '[Khaki Statistics] Set Attendee',
  props<SetAttendeeActionProps>()
);
