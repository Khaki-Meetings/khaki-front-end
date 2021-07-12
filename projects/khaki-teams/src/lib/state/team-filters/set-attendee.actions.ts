import { createAction, props } from '@ngrx/store';
import { SetAttendeeActionProps } from './set-attendee-actions-props';

export const setAttendeeAction = createAction(
  '[Khaki Teams] Set Attendee',
  props<SetAttendeeActionProps>()
);
