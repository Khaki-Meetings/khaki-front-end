import {IntervalEnum} from './interval.enum';

export interface TimeBlockSummaryResponseDto {
  interval: IntervalEnum;
  totalHours: number;
  totalMeetings: number;
  totalCost: number;
  averageCost: number;
  meetingCount: number;
  averageManHours: number;
}
