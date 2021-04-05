import {BaseStatisticsStateSm} from './base-statistics-state-sm';
import { TrailingStatisticsSm } from './trailing-statistics-sm';

export interface TrailingStatisticsAggSm extends BaseStatisticsStateSm {
  internal?: TrailingStatisticsSm;
  external?: TrailingStatisticsSm;
}
