import { createAction, props } from '@ngrx/store';

export const loadTimeBlockSummariess = createAction(
  '[TimeBlockSummaries] Load TimeBlockSummariess'
);

export const loadTimeBlockSummariessSuccess = createAction(
  '[TimeBlockSummaries] Load TimeBlockSummariess Success',
  props<{ data: any }>()
);

export const loadTimeBlockSummariessFailure = createAction(
  '[TimeBlockSummaries] Load TimeBlockSummariess Failure',
  props<{ error: any }>()
);
