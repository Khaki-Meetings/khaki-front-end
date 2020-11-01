import {ErrorSm} from './errorSm';
import {OrganizerStatisticsSm} from './organizer-statistics-sm';

export interface OrganizersStatisticsSm {
  page: number;
  organizers: OrganizerStatisticsSm[];
  errors: ErrorSm[];
}
