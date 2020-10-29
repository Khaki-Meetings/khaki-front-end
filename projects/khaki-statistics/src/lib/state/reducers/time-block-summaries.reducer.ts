import {createReducer} from '@ngrx/store';
import {TimeBlockSummarySm} from '../models/time-block-summary-sm';
import {TimeBlockEnum} from '../models/time-block.enum';


export const timeBlockSummariesFeatureKey = 'timeBlockSummaries';

export const initialState: TimeBlockSummarySm = {
  averageCost: 0,
  timeBlock: TimeBlockEnum.Year,
  totalCost: 0,
  totalTime: 0
};


export const timeBlockSummariesReducer = createReducer(
  initialState,
);

