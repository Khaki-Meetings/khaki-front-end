import {IntervalEnum} from './interval.enum';

export interface TimeBlockSummaryResponseDto {
  interval: IntervalEnum;
  totalSeconds: number;
  totalMeetings: number;
  totalCost: number;
  averageCost: number;
  meetingCount: number;
  averageStaffSeconds: number;
}
