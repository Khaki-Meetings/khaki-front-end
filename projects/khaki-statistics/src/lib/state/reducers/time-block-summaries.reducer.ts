import {createReducer} from '@ngrx/store';
import {TimeBlockSummarySm} from '../models/time-block-summary-sm';
import {IntervalEnum} from '../../services/models/interval.enum';


export const timeBlockSummariesFeatureKey = 'timeBlockSummaries';

export const initialState: TimeBlockSummarySm = {
  averageCost: 0,
  timeBlock: IntervalEnum.Year,
  totalCost: 0,
  totalTime: 0
};


export const timeBlockSummariesReducer = createReducer(
  initialState,
);

