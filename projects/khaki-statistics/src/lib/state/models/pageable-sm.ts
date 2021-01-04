import {ErrorSm} from './error-sm';
import {OrganizerStatisticsSm} from './organizer-statistics-sm';
import {PageDto} from '../../services/models/pagable-dto';

export interface PageableSm<T> extends PageDto<T> {
  errors?: ErrorSm[];
}
