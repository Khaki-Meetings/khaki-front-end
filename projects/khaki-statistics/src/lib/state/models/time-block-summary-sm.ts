import {IntervalEnum} from '../../services/models/interval.enum';
import {ErrorSm} from './errorSm';

export interface TimeBlockSummarySm {
  timeBlock?: IntervalEnum;
  totalSeconds?: number;
  totalCost?: number;
  averageCost?: number;
  meetingCount?: number;
  error?: ErrorSm;
  averageManHours?: number;
}
