import { BaseStatisticsStateSm } from './base-statistics-state-sm';
import { TimeBlockSummaryGoalSm } from './time-block-summary-goal-sm';

export interface TimeBlockSummaryGoalListSm extends BaseStatisticsStateSm {
  goals?: TimeBlockSummaryGoalSm[];
}
