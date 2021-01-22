import { createAction, props } from '@ngrx/store';
import {SetIntervalActionProps} from './set-interval-action-props';

export const setIntervalAction = createAction(
  '[Khaki Settings] Set Interval',
  props<SetIntervalActionProps>()
);
