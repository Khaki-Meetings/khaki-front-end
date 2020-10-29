import {TimeBlockEnum} from '../../state/models/time-block.enum';
import {TimeBlockSummarySm} from '../../state/models/time-block-summary-sm';
import {SinceTimeBlockSummariesSm} from '../../state/models/since-time-block-summaries-sm';

export const weekTimeBlockSummaryData = {
  timeBlock: TimeBlockEnum.Week,
  totalCost: 10.00,
  totalTime: 10,
  averageCost: 10
} as TimeBlockSummarySm;

export const monthTimeBlockSummaryData = {
  timeBlock: TimeBlockEnum.Month,
  totalCost: 10.00,
  totalTime: 10,
  averageCost: 10
} as TimeBlockSummarySm;

export const yearTimeBlockSummaryData = {
  timeBlock: TimeBlockEnum.Year,
  totalCost: 10.00,
  totalTime: 10,
  averageCost: 10
} as TimeBlockSummarySm;

export const timeBlockSummariesData = {
  week: weekTimeBlockSummaryData,
  month: monthTimeBlockSummaryData,
  year: yearTimeBlockSummaryData
} as SinceTimeBlockSummariesSm;

