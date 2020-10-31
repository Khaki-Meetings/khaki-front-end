import {OrganizerStatisticsSm} from "./organizer-statistics-sm";
import {ErrorSm} from "./errorSm";

export interface OrganizersStatisticsSm {
  page: number;
  organizers: OrganizerStatisticsSm[],
  error: ErrorSm[]
}
