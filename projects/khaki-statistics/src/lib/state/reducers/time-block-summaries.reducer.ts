import {createReducer} from '@ngrx/store';
import {TimeBlockSummary} from '../models/time-block-summary';


export const timeBlockSummariesFeatureKey = 'timeBlockSummaries';

export const initialState: TimeBlockSummary = {};


export const timeBlockSummariesReducer = createReducer(
  initialState,
);

