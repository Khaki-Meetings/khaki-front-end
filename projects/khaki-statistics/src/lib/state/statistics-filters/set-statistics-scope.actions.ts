import { createAction, props } from '@ngrx/store';
import {SetStatisticsScopeActionProps} from './set-statistics-scope-action-props';

export const setStatisticsScopeAction = createAction(
  '[Khaki Statistics] Set Statistics Scope',
  props<SetStatisticsScopeActionProps>()
);
