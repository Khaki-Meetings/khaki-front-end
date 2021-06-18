import {createAction, props} from '@ngrx/store';
import {IntervalSe} from '../models/interval-se';

export interface SetCurrentTimeIntervalActionProp {
  interval: IntervalSe;
}

export const setCurrentTimeIntervalAction = createAction(
  '[CurrentTimeInterval] Set CurrentTimeInterval',
  props<SetCurrentTimeIntervalActionProp>()
);
