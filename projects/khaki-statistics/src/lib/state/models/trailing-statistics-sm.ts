import {TimeBlockSummarySm} from './time-block-summary-sm';
import {IntervalEnum} from '../../services/models/interval.enum';
import {BaseStatisticsStateSm} from './base-statistics-state-sm';

export interface TrailingStatisticsSm extends BaseStatisticsStateSm {
  timeBlock?: IntervalEnum;
  timeBlockSummaries?: TimeBlockSummarySm[];
  count?: number;
}
