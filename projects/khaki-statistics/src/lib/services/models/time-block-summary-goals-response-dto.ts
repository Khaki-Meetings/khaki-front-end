import { BaseStatisticsStateSm } from '../../state/models/base-statistics-state-sm';
import { TimeBlockSummaryGoalResponseDto } from './time-block-summary-goal-response-dto';

export interface TimeBlockSummaryGoalsResponseDto extends BaseStatisticsStateSm {
  goals: TimeBlockSummaryGoalResponseDto[];
}
