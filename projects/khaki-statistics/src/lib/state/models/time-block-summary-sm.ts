import {IntervalEnum} from '../../services/models/interval.enum';
import {ErrorSm} from './error-sm';

export interface TimeBlockSummarySm {
  timeBlock?: IntervalEnum;
  totalSeconds?: number;
  totalCost?: number;
  averageCost?: number;
  meetingCount?: number;
  error?: ErrorSm;
  averageStaffSeconds?: number;
  formattedTotalSeconds?: string;
  formattedAverageStaffSeconds?: string;
}
