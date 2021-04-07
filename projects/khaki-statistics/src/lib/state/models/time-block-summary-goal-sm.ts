import { GoalMeasureEnum } from '../../services/models/goal-measure-enum';
import {BaseStatisticsStateSm} from './base-statistics-state-sm';

export interface TimeBlockSummaryGoalSm extends BaseStatisticsStateSm {
  id?: string;
  measure?: GoalMeasureEnum;
  greaterThanOrEqualTo?: number;
  lessThanOrEqualTo?: number;
  departmentName?: string;
}
