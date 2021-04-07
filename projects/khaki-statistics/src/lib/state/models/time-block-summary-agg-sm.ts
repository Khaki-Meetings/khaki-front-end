import {BaseStatisticsStateSm} from './base-statistics-state-sm';
import { TimeBlockSummarySm } from './time-block-summary-sm';

export interface TimeBlockSummaryAggSm extends BaseStatisticsStateSm {
  internal?: TimeBlockSummarySm;
  external?: TimeBlockSummarySm;
  total?: TimeBlockSummarySm;
}
