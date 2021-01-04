import {StatisticsFilterSe} from '../../state/models/statistics-filter-se';

export interface StatisticsQueryParameters {
  page?: number;
  count?: number;
  filter?: StatisticsFilterSe;
}
