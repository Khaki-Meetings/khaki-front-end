import {ErrorSm} from './errorSm';
import {OrganizerStatisticsSm} from './organizer-statistics-sm';
import {PageableSm} from './pageable-sm';

export interface OrganizersStatisticsSm extends PageableSm<OrganizerStatisticsSm>{
  errors?: ErrorSm[];
}
