import { createAction, props } from '@ngrx/store';
import {SetStatisticsScopeActionProps} from './set-statistics-scope-action-props';

export const setStatisticsScopeAction = createAction(
  '[Khaki Settings] Set Statistics Scope',
  props<SetStatisticsScopeActionProps>()
);




