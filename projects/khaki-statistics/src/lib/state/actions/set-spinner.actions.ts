import { createAction, props } from '@ngrx/store';
import {SpinnerSm} from '../models/spinner-sm';

export const setSpinner = createAction(
  '[SetSpinner] Load SetSpinners',
  props<SpinnerSm>()
);




