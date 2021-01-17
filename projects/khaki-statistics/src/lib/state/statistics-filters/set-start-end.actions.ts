import { createAction, props } from '@ngrx/store';
import {SetStartEndActionProps} from './set-start-end-action-props';

export const setStartEndAction = createAction(
  '[Khaki Statistics] Set Start End',
  props<SetStartEndActionProps>()
);
