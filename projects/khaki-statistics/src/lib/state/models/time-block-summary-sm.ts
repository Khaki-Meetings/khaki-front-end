import {TimeBlockEnum} from './time-block.enum';

export interface TimeBlockSummarySm {
  timeBlock: TimeBlockEnum;
  totalTime?: number;
  totalCost?: number;
  averageCost?: number;
}
