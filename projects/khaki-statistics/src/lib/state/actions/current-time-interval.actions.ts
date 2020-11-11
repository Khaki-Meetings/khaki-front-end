import { createAction, props } from '@ngrx/store';
import {IntervalEnum} from '../../services/models/interval.enum';

export interface SetCurrentTimeIntervalActionProp {
  interval: IntervalEnum;
}

export const setCurrentTimeIntervalAction = createAction(
  '[CurrentTimeInterval] Set CurrentTimeInterval',
  props<SetCurrentTimeIntervalActionProp>()
);



