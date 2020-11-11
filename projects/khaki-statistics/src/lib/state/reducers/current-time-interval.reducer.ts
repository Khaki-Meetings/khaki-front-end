import {createReducer, on} from '@ngrx/store';
import {IntervalEnum} from '../../services/models/interval.enum';
import {setCurrentTimeIntervalAction} from '../actions/current-time-interval.actions';


export const currentTimeIntervalFeatureKey = 'currentTimeInterval';

export const initialState: IntervalEnum = IntervalEnum.Week;


export const currentTimeIntervalReducer = createReducer(
  initialState,
  on(
    setCurrentTimeIntervalAction,
    (state, action) => {
      return action.interval;
    }
  )
);

