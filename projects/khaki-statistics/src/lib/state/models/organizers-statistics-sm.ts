import {ErrorSm} from './error-sm';
import {OrganizerStatisticsSm} from './organizer-statistics-sm';
import {PageableSm} from './pageable-sm';
import {IntervalEnum} from '../../services/models/interval.enum';
import {StatisticsQueryParameters} from '../../services/models/statistics-query-parameters';

export interface OrganizersStatisticsSm extends PageableSm<OrganizerStatisticsSm>{
  errors?: ErrorSm[];
  interval?: IntervalEnum;
  statisticsQueryParams?: StatisticsQueryParameters;
}
