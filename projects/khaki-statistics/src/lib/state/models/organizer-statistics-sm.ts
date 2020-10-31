import {OrganizerSm} from './organizerSm';

export interface OrganizerStatisticsSm {
  organizer: OrganizerSm;
  totalMeetings: number;
  totalHours: number;
  totalCost: number;
}
