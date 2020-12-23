import {ErrorSm} from './errorSm';
import {OrganizerStatisticsSm} from './organizer-statistics-sm';
import {PageDto} from '../../services/models/pagable-dto';

export interface PageableSm<T> extends PageDto<T> {
  errors?: ErrorSm[];
}
