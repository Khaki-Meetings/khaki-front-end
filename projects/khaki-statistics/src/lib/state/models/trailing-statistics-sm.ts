import {TimeBlockEnum} from './time-block.enum';
import {TimeBlockSummarySm} from './time-block-summary-sm';
import {ErrorSm} from './errorSm';

export interface TrailingStatisticsSm {
  timeBlock?: TimeBlockEnum;
  timeBlockSummaries?: TimeBlockSummarySm[];
  count?: number;
  errors?: ErrorSm[];
}
