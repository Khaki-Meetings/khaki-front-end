import {TimeBlockSummarySm} from './time-block-summary-sm';
import {ErrorSm} from './errorSm';

export interface SinceTimeBlockSummariesSm {
  week: TimeBlockSummarySm;
  month: TimeBlockSummarySm;
  year: TimeBlockSummarySm;
  errors: ErrorSm[];
}
