import {ErrorSm} from './error-sm';
import {OrganizerStatisticsSm} from './organizer-statistics-sm';
import {PageableSm} from './pageable-sm';

export interface OrganizersStatisticsSm extends PageableSm<OrganizerStatisticsSm>{
  errors?: ErrorSm[];
}
