import {IntervalEnum} from './interval.enum';

export interface TimeBlockSummaryResponseDto {
  interval: IntervalEnum;
  totalTime: number;
  totalMeetings: number;
  totalCost: number;
  averageCost: number;
  meetingCount: number;
}