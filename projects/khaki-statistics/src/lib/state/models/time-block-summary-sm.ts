import {IntervalEnum} from '../../services/models/interval.enum';
import {ErrorSm} from './errorSm';

export interface TimeBlockSummarySm {
  timeBlock?: IntervalEnum;
  totalTime?: number;
  totalCost?: number;
  averageCost?: number;
  totalMeetings?: number;
  error?: ErrorSm;
}
