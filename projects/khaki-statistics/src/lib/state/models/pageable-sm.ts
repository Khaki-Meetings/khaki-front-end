import {PageDto} from '../../services/models/pagable-dto';
import {BaseStatisticsStateSm} from './base-statistics-state-sm';

export interface PageableSm<T> extends PageDto<T>, BaseStatisticsStateSm {
}
