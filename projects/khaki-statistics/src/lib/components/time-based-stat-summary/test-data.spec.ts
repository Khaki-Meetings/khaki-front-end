import {TimeBlockSummarySm} from '../../state/models/time-block-summary-sm';
import {IntervalEnum} from '../../services/models/interval.enum';

export const timeBlockSummaryData: TimeBlockSummarySm = {
  timeBlock: IntervalEnum.Week,
  totalCost: 10.00,
  totalSeconds: 10,
  averageCost: 10
};

