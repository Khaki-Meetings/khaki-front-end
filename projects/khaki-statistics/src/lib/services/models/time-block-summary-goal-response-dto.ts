import { GoalMeasureEnum } from './goal-measure-enum';

export interface TimeBlockSummaryGoalResponseDto {
  id: string;
  measure: GoalMeasureEnum;
  greaterThanOrEqualTo: number;
  lessThanOrEqualTo: number;
  departmentName: string;
}
