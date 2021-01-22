import {StatisticsScopeSe} from '../../state/statistics-filters/statistics-scope-se.enum';

export interface StatisticsQueryParameters {
  page?: number;
  count?: number;
  statisticsScope?: StatisticsScopeSe;
}
