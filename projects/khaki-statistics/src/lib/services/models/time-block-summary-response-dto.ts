import {IntervalEnum} from './interval.enum';

export interface TimeBlockSummaryResponseDto {
  interval: IntervalEnum;
  totalTime: number;
  totalCost: number;
  averageCost: number;
  meetingCount: number;
}
