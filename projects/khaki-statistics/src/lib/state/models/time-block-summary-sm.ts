import { Moment } from 'moment';
import {IntervalEnum} from '../../services/models/interval.enum';
import {BaseStatisticsStateSm} from './base-statistics-state-sm';

export interface TimeBlockSummarySm extends BaseStatisticsStateSm {
  timeBlock?: IntervalEnum;
  totalSeconds?: number;
  totalCost?: number;
  averageCost?: number;
  meetingCount?: number;
  averageStaffSeconds?: number;
  formattedTotalSeconds?: string;
  formattedAverageStaffSeconds?: string;
  numEmployees?: number;
  numWorkdays?: number;
  totalMeetingAttendees?: number;
  totalMeetingInternalAttendees?: number;
  meetingLengthSeconds?: number;
}
