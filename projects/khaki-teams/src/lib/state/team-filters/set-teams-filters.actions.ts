import { createAction, props } from '@ngrx/store';
import { SetTeamsFiltersActionProps } from './set-teams-filters-action-props';

export const setTeamsFiltersAction = createAction(
  '[Khaki Teams] Set Teams Filters',
  props<SetTeamsFiltersActionProps>()
);
