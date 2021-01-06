import {TimeBlockSummarySm} from './time-block-summary-sm';
import {ErrorSm} from './error-sm';
import {IntervalEnum} from '../../services/models/interval.enum';

export interface TrailingStatisticsSm {
  timeBlock?: IntervalEnum;
  timeBlockSummaries?: TimeBlockSummarySm[];
  count?: number;
  errors?: ErrorSm[];
  loading?: boolean;
}
