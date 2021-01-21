import { createAction, props } from '@ngrx/store';
import {SetStartEndActionProps} from './set-start-end-action-props';

export const setStartEndAction = createAction(
  '[Khaki Settings] Set Start End',
  props<SetStartEndActionProps>()
);




